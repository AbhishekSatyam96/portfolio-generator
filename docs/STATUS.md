# Project Status

**AI Portfolio Generator** — status as of 2026-07-29
Branch: `main` · Last commit: `0dc699f` "remaining changes" · Working tree clean

---

## 1. Summary

The app is a **working front-end prototype with no persistence**. All five screens
(landing → auth → dashboard → 4-step form → preview) are built and navigable, auth is
live, and the AI generation flow is wired end to end. Two things stop it being usable:

1. **The Claude API calls are broken.** `lib/claude.ts` pins `claude-3-5-sonnet-latest`,
   which was retired and now returns `404 not_found_error`. Verified against the live API.
2. **Nothing is saved.** Supabase is installed but there is zero database code — no
   client, no schema applied, no env vars, no CRUD routes. All state lives in
   `localStorage` via Zustand and is lost when the browser clears.

Roughly **60% of the v1 scope** in [HLD.md](HLD.md) / [LLD.md](LLD.md) is done — the whole
client half. The backend half (database, portfolio API, public pages) has not started.

---

## 2. What works

| Area | Status | Notes |
|---|---|---|
| Landing page | ✅ Done | [app/page.tsx](../app/page.tsx), 546 lines, custom hero + browser mockup |
| Auth (Clerk) | ✅ Done | Sign-in / sign-up pages, keys configured in `.env.local` |
| Route protection | ✅ Done | [proxy.ts](../proxy.ts) — public: `/`, `/sign-in*`, `/sign-up*`, `/p/*` |
| Dashboard shell | ⚠️ UI only | [dashboard/page.tsx](../app/(protected)/dashboard/page.tsx#L25) — `hasPortfolio = false` hardcoded, `portfolioData = null` |
| 4-step create form | ✅ Done | Personal info, experience, skills, projects — all with add/remove/validate |
| Step indicator + nav | ✅ Done | [step-indicator.tsx](../components/ui/step-indicator.tsx), back-nav only to completed steps |
| Preview page | ✅ Done | [preview/page.tsx](../app/(protected)/preview/page.tsx), desktop/mobile toggle, 5 portfolio sections |
| State management | ✅ Done | [lib/store.ts](../lib/store.ts) — Zustand + `persist` to `localStorage` |
| Types | ✅ Done | [types/index.ts](../types/index.ts) |
| AI prompts | ✅ Done | [lib/prompts.ts](../lib/prompts.ts) — bio + project-enhancement templates |
| AI API routes | ⚠️ Broken | Code is correct; the model ID is dead (see below) |
| TypeScript | ✅ Clean | `npx tsc --noEmit` passes with no errors |
| Design system | ✅ Done | shadcn/ui + Tailwind 4, dark-mode-aware tokens in `globals.css` |

---

## 3. Blockers

### 3.1 Retired Claude model ID — AI generation returns 404

[lib/claude.ts:13](../lib/claude.ts#L13) uses `claude-3-5-sonnet-latest`. That alias points
at `claude-3-5-sonnet-20241022`, retired 2025-10-28. Confirmed live:

```
GET /v1/models/claude-3-5-sonnet-latest
→ {"type":"error","error":{"type":"not_found_error","message":"model: claude-3-5-sonnet-latest"}}
```

Both `/api/ai/generate-bio` and `/api/ai/enhance-project` will throw, so
"Generate & Preview" on the create page silently falls back to the raw user text.

**Fix:** switch to `claude-sonnet-5` (or `claude-opus-5` for higher quality). Not a
drop-in string swap — the newer models drop `temperature`/`top_p` and manual
`budget_tokens`, and adaptive thinking is on by default, so `max_tokens` now caps
thinking *plus* the answer. The current calls pass neither sampling params nor thinking
config, so in practice the change is the model string plus raising `max_tokens`
(currently 500 for bio, 300 for project) to leave room.

### 3.2 No persistence layer

`@supabase/supabase-js` is in `package.json` but:

- No `lib/supabase.ts` — the client is never instantiated
- No Supabase keys in `.env.local` (only Clerk + Claude are set)
- The SQL schema in [LLD.md §2.2](LLD.md) has not been applied anywhere
- No `/api/portfolio` routes exist (LLD §4.2 specifies four)

---

## 4. Not started

| Item | Spec | Impact |
|---|---|---|
| `lib/supabase.ts` client | LLD §1 | Everything below depends on it |
| Database schema (`users`, `portfolios`, `experiences`, `projects`) | LLD §2.2 | — |
| `GET/POST/PUT /api/portfolio` | LLD §4.2 | Dashboard, save-draft, publish all blocked |
| `GET /api/portfolio/[username]` | LLD §4.2 | — |
| Public portfolio page `/p/[username]` | HLD §4 | The core "shareable link" value prop. `proxy.ts` already whitelists the route; the page does not exist |
| Clerk → Supabase user sync | LLD §2.2 (`clerk_id` column) | — |
| Rate limiting on AI endpoints | HLD §7 | Cost/abuse exposure |
| Input sanitization before Claude calls | HLD §7 | — |
| Tests / CI | — | None of either |

---

## 5. Open TODOs in code

| Location | TODO |
|---|---|
| [preview/page.tsx:53](../app/(protected)/preview/page.tsx#L53) | Publish is a 2s `setTimeout`, no API call |
| [create/page.tsx:137](../app/(protected)/create/page.tsx#L137) | Save-draft is a 1s `setTimeout`, no API call |
| [dashboard/page.tsx:24](../app/(protected)/dashboard/page.tsx#L24) | Fetch portfolio from Supabase |
| [preview/page.tsx:49](../app/(protected)/preview/page.tsx#L49) | Share URL hardcodes `portfoliogen.com`; should use `NEXT_PUBLIC_APP_URL` |

Also: `.env.example` is untracked (`.gitignore` line 34 matches `.env*`), so a fresh clone
has no record of the required variables. Consider `git add -f .env.example`.

---

## 6. Suggested order of work

1. Fix the model ID — unblocks the only differentiating feature, ~10 minutes.
2. Add `lib/supabase.ts` + apply the LLD schema.
3. Build `/api/portfolio` CRUD, then wire the three `setTimeout` stubs to it.
4. Build `/p/[username]` — reuse the existing `components/portfolio/*` sections, which are
   already pure presentational components taking props.
5. Replace the dashboard's hardcoded `hasPortfolio` with a real fetch.
6. Rate limiting + input sanitization before any public deploy.

---

## 7. Stack reference

Next.js 16.1.6 (App Router) · React 19.2.3 · TypeScript 5 · Tailwind CSS 4 ·
shadcn/ui + Radix · Zustand 5 · react-hook-form 7 + Zod 4 · Clerk 6.37 ·
`@anthropic-ai/sdk` 0.72 · `@supabase/supabase-js` 2.93 (unused) · lucide-react

Note: this project is on Next.js 16, where `middleware.ts` was renamed to `proxy.ts` —
that rename happened in commit `0dc699f` and is correct, not a stray file.
