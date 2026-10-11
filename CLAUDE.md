# Vishesh Sharma — Personal Portfolio

Project rules for Claude Code sessions in this repo. This file is self-contained: read all of it before changing anything.

## Workflow (mandatory)

- Work on **one roadmap step per request**. Never build ahead or start the next step unprompted.
- For every step: inspect the existing code first → implement only that step → `npm run format` → `npm run check` → `npm run build` → verify UI changes in a real browser at 390, 768 and 1280px → report files changed, checks and test results → **stop and wait** for approval.
- Fix real failures before stopping; don't make extra improvements after verification.
- Never delete or rewrite working code unnecessarily. Add a dependency only in the step that needs it.
- **Git:** never commit, push or deploy unless explicitly asked. After a step is approved the user may ask for a milestone commit: stage only that step's files (never `.env*` other than `.env.example`, never secrets), push to `origin/main`, never force-push, then confirm local `main`, `origin/main` and GitHub `main` match and the tree is clean.
- Run commands from the repo root. The shell is Git Bash on Windows.

## Content rules

- No fake personal information, no generated or stock profile photos, and no fake functionality presented as real (e.g. a contact form that doesn't send).
- When real content is missing, use a clearly temporary placeholder that cannot pass as real data.
- **No certifications anywhere:** no section, no database table, nothing in chatbot knowledge (the bot says it has no information about that).
- **No internship or work-experience entry anywhere:** no section, no table, nothing in chatbot knowledge.
- Portfolio content is never hardcoded in components (see Architecture).
- Secrets only in environment variables: never in source, in this file or in `VITE_*` variables.

## Product

A premium, minimal, product-like portfolio for Vishesh Sharma (AI/GenAI, ML and data-analytics developer), not a student template.

Sections, exactly these and in this order (ids live in `src/app/navigation.ts`): Home `#home` · About Me `#about` · Education `#education` · Skills `#skills` · Featured Projects `#projects` · AI / GenAI `#ai` · GitHub Activity `#github` · Resume `#resume` · Contact `#contact`.

- **Hero:** slot for the owner's real photo (neutral fallback), headline, calls to action, chatbot entry point. The photo and the chatbot are the visual focal points.
- **Education:** school, Class X, Class XII, B.Tech, college/university, CGPA or percentage, dates. When an entry is `current` and has an `endDate`, show that date as expected, e.g. "2022 – 2026 (expected)".
- **Skills categories:** Programming, Data Analytics, AI / ML, GenAI, Web Development, Databases, Tools.
- **Featured Projects, exactly these three:** SizerAI · Explainable Fraud Detection System · Olympic Analytics. Their text in `src/content/local/projects.ts` comes verbatim from the owner: don't reword it or add claims. Each has title, description, technologies, key features, GitHub link, live demo link, image and featured flag.
- **AI / GenAI:** machine learning, LLMs, RAG, vector databases, prompt engineering, AI agents, computer vision, generative AI.
- **GitHub Activity:** profile, contribution activity, selected repositories.
- **Resume:** preview, View and Download.
- **Contact:** email, phone (hidden unless the owner enables it), LinkedIn, GitHub, and a contact form that really sends.
- **Chatbot:** answers questions about Vishesh using only portfolio content, and says it doesn't have the information otherwise.
- **Admin:** only the owner can edit content, through real authentication and database authorization, never hidden buttons.

## Design system (approved; preserve it)

- Off-white canvas, deep navy text, white cards, subtle borders and shadows, generous spacing, Inter Variable (self-hosted), restrained motion.
- **One accent only:** deep indigo / blue-violet. Avoid rainbow colours, neon, glow, large gradients, 3D, glassmorphism, excessive animation and clutter.
- Tokens live in `src/styles/globals.css` (`@theme`). Tailwind's default palette is removed (`--color-*: initial`), so use `canvas`, `surface`, `ink-*`, `accent-*`, `danger-*`, `success-*` and the semantic `fg`, `fg-muted`, `fg-subtle`, `border`, `border-strong`, `border-input`.
- Other tokens: text `display|title|heading|lead|eyebrow`; spacing `section`, `gutter`, `header`; containers `content`, `narrow`; shadows `card`, `card-hover`, `accent`; easing `smooth`. Register any new custom token in `src/lib/cn.ts` (tailwind-merge) too.
- Accessibility: WCAG AA contrast (text ≥ 4.5:1, form-field outlines ≥ 3:1), visible focus ring, skip link, semantic landmarks, touch targets ≥ 44px, `prefers-reduced-motion` honoured (CSS safety net in `globals.css`; use `motion-safe:` for movement).
- Base UI in `src/components/ui/`: `Button`/`ButtonLink` (`buttonStyles()` styles router links), `Card`, `Badge`, `Container`, `Section`, `SectionHeader`, form controls, `SkipLink`.

## Stack and tooling

- React 19, TypeScript 6 (strict, `noUncheckedIndexedAccess`), Vite 8, Tailwind CSS 4, React Router 8 (data router).
- ESLint 10 flat config (typescript-eslint strict and stylistic type-checked, React Hooks, React Refresh) and Prettier with Tailwind class sorting. No non-null assertions.
- Scripts: `dev` (http://localhost:5173), `build` (`tsc -b`, then `content:check`, then `vite build`), `preview`, `typecheck`, `lint` (`--max-warnings 0`), `format`, `format:check`, `content:check`, `check` (typecheck + lint + format:check + content:check).
- `npm run content:check` validates the local content against the zod schemas (Node runs `scripts/check-content.ts` directly). Invalid content fails `check` and `build`, so it can never ship. It also lists content still to add, which doesn't fail anything.
- Node `^22.18.0 || >=24` (needed to run TypeScript files directly). Keep TypeScript on `~6.0` until typescript-eslint supports TypeScript 7. Line endings are LF (`.gitattributes`).
- Planned, installed only in the step that needs them: Framer Motion (`motion`, wrapped in `MotionConfig reducedMotion="user"`), Supabase JS, TanStack Query, zod, react-hook-form, lucide-react, react-markdown, Anthropic SDK, Upstash rate limiting, Resend.

## Architecture

- Folders: `src/app/` (router, root layout, navigation config, site identity), `src/components/ui/` and `src/components/layout/`, `src/features/<section>/` (one folder per page section, e.g. `hero/`, plus `chatbot/`), `src/pages/` (route pages that compose the features), `src/admin/` (lazy-loaded chunk), `src/hooks/`, `src/lib/`, and `src/content/`.
- **Content:** components read content only through hooks (`useProfile()`, `useProjects()`, …) imported from `src/content/index.ts`, never from `local/` directly. Schemas in `src/content/schema.ts` are the single source of truth (types are inferred from them) and only validate, never change values. Real local content lives in `src/content/local/`, with `TODO(content)` notes where details aren't verified yet. All hooks go through one `useContent()`, which is the only thing that changes when the source switches to Supabase (Step 13). The app imports content types only, so zod stays out of the browser bundle.
- **Supabase:** Postgres, Auth and Storage. Row-level security is the security layer: `is_admin()` requires an `admins` allowlist entry **and** an MFA-verified session. The public can read only published or visible rows. Sign-ups are disabled. SQL lives in `supabase/migrations/`.
- **Browser env vars:** only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Everything else is server-only (names in `.env.example`).
- **Server:** Vercel functions in `api/` (`chat`, `contact`, `github`), server-only helpers in `server/`, shared schemas in `shared/`. Never import `server/` from `src/`.
- **Chatbot:** `/api/chat` builds the knowledge text from published content, uses a cached system prompt (no RAG), streams replies, validates input and rate-limits. The model comes from the `CHAT_MODEL` env var; never hardcode one.
- **Chatbot switch:** `CHATBOT_ENABLED` in `src/features/chatbot/config.ts` stays `false` until Step 21. The Hero's chatbot entry renders only when the switch is on **and** a real `onOpenChat` handler is passed to `<Hero>`, so nothing can look clickable without working. While off, the production build drops the entry's code.
- **Admin:** `/admin/*` is lazy-loaded; email + password + TOTP MFA. Route guards only control what the UI shows.

## Roadmap

Done: **Steps 1–6** (Steps 1–2 in commit `9aa798e`, Step 3 in `c9b81bd`, Step 4 in `0f74b8d`, Step 5 in `55006fc`, Step 6 in the commit that adds `src/features/education/`). **Next: Step 7.**

- **1. Done.** Vite + React + TypeScript (strict), ESLint, Prettier, scripts, `.gitignore`, `.env.example`
- **2. Done.** Tailwind, design tokens, Inter, base UI components, reduced-motion and accessibility foundation
- **3. Done.** App shell: router (`/`, `/admin/*` placeholder, 404), sticky navbar, active section, mobile menu, smooth scrolling, footer
- **4. Done.** Content types and zod schemas, content module with verified local content, data hooks, `content:check`
- **5. Done.** Hero: name, headline, CTAs (Resume only when a resume exists), profile links, photo or initials in a fixed frame, chatbot entry behind `CHATBOT_ENABLED`
- **6. Done.** About + Education timeline (ordered list, newest first; current entries with an `endDate` show it as expected, e.g. "2023 – 2027 (expected)"; sections render nothing when their content is empty)
- **7.** Skills
- **8.** Featured Projects (cards, detail view). The two Streamlit demos (Explainable Fraud Detection System, Olympic Analytics) sleep on Community Cloud when unused, so their "Live demo" link needs a short, honest hint, e.g. "Hosted on Streamlit, may take a moment to wake up". Render a project's optional `extraLink` as a third link button in the same style as GitHub and Live demo, opening in a new tab with `rel="noopener noreferrer"`, and check it fits at 390px
- **9.** AI / GenAI
- **10.** Resume (preview, View, Download) + contact links; the form waits for Step 18
- **11.** Responsive, accessibility and performance pass; title, description and social-preview tags; font preload
- **11b.** First Vercel deploy of the public site (local content only, no Supabase/admin/chatbot yet). Deploy only when I ask.
- **12.** Supabase migrations, RLS, `is_admin()`, storage, seed data, generated types (the owner creates the Supabase project). The `projects` table needs columns for `extraLink` (label and url)
- **13.** Switch the content module to Supabase (map database `null`s to `undefined` before parsing, since the schemas reject `null`); verify the public can read but not write
- **14.** Admin login + MFA, protected routes
- **15.** Admin: profile, About, contact details, social links
- **16.** Admin: education and skills (with reordering)
- **17.** Admin: projects, AI / GenAI, image uploads, resume and photo replacement, chatbot knowledge (may split)
- **18.** `/api/contact` (validation, spam honeypot, rate limit, save, optional email) + working form + admin inbox
- **19.** `/api/github` (cached) + GitHub Activity section
- **20.** `/api/chat` (knowledge builder, system prompt, streaming, caching, limits)
- **21.** Chat UI (panel, full-screen sheet on mobile, streaming, suggested questions)
- **22.** Tests + Lighthouse pass
- **23.** Production deploy to Vercel (server env vars, preview deploys, domain). Deploy only when asked.

## Gotchas

- Section links are `Link to="/#id"`. React Router's `ScrollRestoration` scrolls to them using CSS smooth scrolling (`scroll-padding-top` is the navbar height), or to the top when the section doesn't exist yet. No custom scroll JavaScript.
- `ScrollRestoration` has a `getKey` that keys fresh page loads by URL, because React Router gives every fresh load the same key, `"default"`.
- The root route needs `HydrateFallback`; React Router 8 warns on direct loads of lazy routes without it.
- The mobile menu closes on navigation by remembering the `location.key` it was opened at (the React Hooks lint rules forbid setState inside effects).
- Tailwind 4 animates the `translate` and `scale` properties, not `transform`, so name those in `transition-[...]`.
- The first deploy (11b) needs a Vercel SPA rewrite so deep links such as `/admin` work.
- Headless Chrome ignores `--window-size` below about 500px; emulate viewports through the DevTools protocol instead.
- Verifying hidden states (resume, chatbot, photo) happens in a scratchpad copy, never in the repo. Those scripts must use `set -euo pipefail`, check that the copy path is inside the scratchpad, and use absolute paths for every edit. Never rely on `cd` inside an `&&` chain: if an earlier command fails, later lines run in the real repo. Create the `node_modules` junction with PowerShell `New-Item -ItemType Junction`, and remove the junction itself (`(Get-Item path).Delete()`) before deleting the copy, or `rm -rf` can follow it into the real `node_modules`.
- zod 4's `z.url()` trims its input, so `httpsUrl` rejects whitespace on the raw string first. Keep that order, or " https://…" passes validation while the site uses the untrimmed value.
- Tailwind scans every non-ignored file, Markdown included, so words in CLAUDE.md can generate unused CSS (about 1 kB). Excluding it with `@source not` belongs to the Step 11 performance pass.
