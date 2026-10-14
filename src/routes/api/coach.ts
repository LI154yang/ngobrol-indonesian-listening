import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { lessons } from "@/data/lessons";
import { createLovableAiGatewayRunIdFetch } from "@/server/run-id";

const Body = z.object({
  lessonId: z.string(),
  prompt: z.string().max(300).optional(),
  answer: z.string().trim().min(1).max(500),
});

const SYSTEM = `你是一位耐心、专业的印尼语口语老师，学生是中文母语者。学生会在给定的生活情景中，用印尼语写出自己的回答。请用简体中文点评，结构严格如下（使用这些小标题，不要使用 Markdown 符号如 # 或 **）：
【整体评价】一句话，先肯定做得好的地方。
【纠正】逐条列出语法、拼写、用词错误：原文 → 修改 → 简短原因。如果没有错误就写"没有明显错误"。
【更自然的说法】给出 1-2 句印尼本地人更常用的说法（印尼语），每句后附中文意思，并说明适用场合（正式/口语）。
【小贴士】一条与该情景相关的文化或礼貌提示。
如果学生写的不是印尼语，温和提醒并给出一个示范回答。保持简洁。`;

export const Route = createFileRoute("/api/coach")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "请输入 1-500 字的回答。" }, { status: 400 });
        const lesson = lessons.find(l => l.id === parsed.data.lessonId);
        if (!lesson) return Response.json({ error: "课程不存在。" }, { status: 404 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI 服务未配置。" }, { status: 500 });

        const context = `课程：${lesson.title}（${lesson.level}）\n情景：${lesson.scene}\n练习题目：${parsed.data.prompt ?? "自由回应这个情景"}\n本课词汇：${lesson.vocab.map(v => `${v.word}=${v.meaning}`).join("，")}\n\n学生的印尼语回答：\n${parsed.data.answer}`;
        const gateway = createLovableAiGatewayRunIdFetch();
        let upstream: Response;
        try {
          upstream = await gateway.fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            signal: request.signal,
            headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              input: [{ role: "system", content: SYSTEM }, { role: "user", content: context }],
              stream: true,
              store: false,
              reasoning: { effort: "low", summary: "auto" },
              include: ["reasoning.encrypted_content"],
            }),
          });
        } catch (error) {
          if (request.signal.aborted) return new Response(null, { status: 499 });
          throw error;
        }
        if (!upstream.ok || !upstream.body) {
          const data = await upstream.json().catch(() => ({})) as { error?: { message?: string }; message?: string };
          const msg = upstream.status === 429 ? "请求太频繁，请稍后再试。"
            : upstream.status === 402 ? (data.message ?? "AI 额度已用完。")
            : data.error?.message ?? data.message ?? "AI 暂时无法回应。";
          return Response.json({ error: msg }, { status: upstream.status });
        }

        // Convert SSE into a plain text stream of output deltas.
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        const stream = new ReadableStream<Uint8Array>({
          async start(controller) {
            let buffer = "";
            let any = false;
            try {
              while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                  if (!line.startsWith("data:")) continue;
                  const payload = line.slice(5).trim();
                  if (!payload || payload === "[DONE]") continue;
                  try {
                    const evt = JSON.parse(payload) as { type?: string; delta?: string; error?: { message?: string }; response?: { error?: { message?: string } } };
                    if (evt.type === "response.output_text.delta" && evt.delta) { any = true; controller.enqueue(encoder.encode(evt.delta)); }
                    else if (evt.type === "error" || evt.type === "response.failed") {
                      controller.enqueue(encoder.encode(`\n\n[出错了：${evt.error?.message ?? evt.response?.error?.message ?? "AI 回应失败"}]`));
                    }
                  } catch { /* ignore partial */ }
                }
              }
              if (!any) controller.enqueue(encoder.encode("[AI 没有返回内容，请换个说法再试一次。]"));
            } catch { /* client aborted */ }
            controller.close();
          },
          cancel() { reader.cancel().catch(() => {}); },
        });
        return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" } });
      },
    },
  },
});
