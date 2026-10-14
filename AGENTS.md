<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the course center at `/`, individual lessons at `/lessons/$lessonId`, and the listening quiz at `/quiz` so courses can be opened and shared independently.
- Keep bilingual lesson content in the shared lesson catalog and presentation metadata separately so every course page uses the same listening experience.

- When adding a lesson, also add its `courseDetails` entry (category + photo) in `src/data/course-catalog.ts`; `src/test/lesson-content.test.ts` guards that every lesson stays reachable, translatable and dictation-friendly.
