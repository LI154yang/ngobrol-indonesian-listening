import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { lessons } from "@/data/lessons";
import { stories } from "@/data/stories";
import { createLovableAiGatewayRunIdFetch } from "@/server/run-id";

const Body = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) })).min(1).max(30),
  mistakes: z.array(z.string().max(200)).max(40).optional(),
});

const catalog = lessons.map(l => `· ${l.title}（${l.level}）：${l.vocab.map(v => `${v.word}=${v.meaning}`).join("，")}`).join("\n");
const storyList = stories.map(s => `· ${s.title}（${s.titleId}）`).join("\n");

const SYSTEM = `你是「Ngobrol! 印尼语听力课堂」的学习助手，学生是中文母语者。你的任务是帮学生整合学过的内容：总结课程重点、按主题归纳词汇和句型、对比易混词、根据错题制定复习计划、出小练习。用简体中文回答，印尼语例句后附中文。回答简洁有条理，可以用简单的 - 列表，不要用 # 或 ** 等 Markdown 符号。

本站课程与词汇：
${catalog}

故事阅读：
${storyList}`;

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "消息格式不正确或太长。" }, { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "AI 服务未配置。" }, { status: 500 });
        const mistakeNote = parsed.data.mistakes?.length ? `\n\n学生错题库里的词：${parsed.data.mistakes.join("，")}` : "";
        const input = [{ role: "system", content: SYSTEM + mistakeNote }, ...parsed.data.messages];
        const gateway = createLovableAiGatewayRunIdFetch();
        let upstream: Response;
        try {
          upstream = await gateway.fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            signal: request.signal,
            headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              input,
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
