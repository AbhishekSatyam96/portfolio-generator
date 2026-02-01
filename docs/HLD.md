# High-Level Design (HLD)
## AI Portfolio Generator

---

## 1. Overview

A web application that collects user's professional information through a multi-step form and uses AI (Claude API) to generate a polished, shareable portfolio website.

### 1.1 Goals
- Simplify portfolio creation for job seekers
- Use AI to generate professional content (bio, descriptions)
- Provide shareable public links for recruiters

### 1.2 Non-Goals (v1)
- Multiple portfolio templates
- Real-time collaboration
- Mobile app
- Resume parsing/import

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT (Browser)                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Landing   │  │  Auth Pages │  │  Form Flow  │  │  Portfolio  │        │
│  │    Page     │  │   (Clerk)   │  │  (4 Steps)  │  │   Preview   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NEXT.JS APPLICATION                                │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         API Routes (Backend)                          │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │ /api/auth  │  │/api/profile│  │ /api/ai/*  │  │/api/portfolio│    │  │
│  │  │  (Clerk)   │  │   (CRUD)   │  │ (Generate) │  │  (Public)   │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                    │                       │                      │
                    ▼                       ▼                      ▼
            ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
            │    Clerk     │      │   Claude     │      │   Supabase   │
            │  (Auth)      │      │   API        │      │  (Database)  │
            └──────────────┘      └──────────────┘      └──────────────┘
```

---

## 3. User Flow

```
┌─────────┐     ┌─────────┐     ┌─────────────────────────────┐     ┌──────────┐
│ Landing │────▶│ Sign Up │────▶│     Multi-Step Form         │────▶│ Generate │
│  Page   │     │ (Clerk) │     │ Step 1: Personal Info       │     │   with   │
└─────────┘     └─────────┘     │ Step 2: Experience          │     │    AI    │
                                │ Step 3: Skills              │     └────┬─────┘
                                │ Step 4: Projects            │          │
                                └─────────────────────────────┘          ▼
                                                                   ┌──────────┐
┌─────────┐     ┌─────────┐     ┌─────────────────────────────┐   │ Preview  │
│ Share   │◀────│  Save   │◀────│     Edit AI Content         │◀──│ Portfolio│
│  Link   │     │         │     │  (Manual adjustments)       │   └──────────┘
└─────────┘     └─────────┘     └─────────────────────────────┘
```

---

## 4. Component Architecture

```
App
├── Layout
│   ├── Navbar
│   └── Footer
│
├── Pages
│   ├── Landing (/)
│   ├── Auth (/sign-in, /sign-up) [Clerk]
│   ├── Dashboard (/dashboard)
│   ├── Form (/create)
│   │   ├── PersonalInfoStep
│   │   ├── ExperienceStep
│   │   ├── SkillsStep
│   │   └── ProjectsStep
│   ├── Preview (/preview)
│   └── Public Portfolio (/p/[username])
│
└── Shared Components
    ├── FormInput
    ├── FormTextarea
    ├── StepIndicator
    ├── LoadingSpinner
    ├── AIGenerateButton
    └── PortfolioTemplate
```

---

## 5. Data Flow for AI Generation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI GENERATION FLOW                                 │
└─────────────────────────────────────────────────────────────────────────────┘

Step 1: User completes form
         │
         ▼
┌─────────────────┐
│  Collect Data   │  name, title, experience[], skills[], projects[]
└────────┬────────┘
         │
         ▼
Step 2: User clicks "Generate Portfolio"
         │
         ▼
┌─────────────────┐
│  API Route      │  POST /api/ai/generate-bio
│  Prepares       │  POST /api/ai/enhance-projects
│  Prompts        │
└────────┬────────┘
         │
         ▼
Step 3: Claude API calls (can be parallel)
         │
         ▼
┌─────────────────┐
│  Claude API     │  Returns: generatedBio, enhancedProjects[]
└────────┬────────┘
         │
         ▼
Step 4: Display in Preview
         │
         ▼
┌─────────────────┐
│  User can edit  │  Manual adjustments to AI content
└────────┬────────┘
         │
         ▼
Step 5: Save to Database
         │
         ▼
┌─────────────────┐
│  Supabase       │  portfolios table updated
└─────────────────┘
```

---

## 6. External Services

| Service | Purpose | Why Chosen |
|---------|---------|------------|
| **Clerk** | Authentication | Easy setup, no backend needed, social logins |
| **Supabase** | Database + Storage | PostgreSQL, easy for frontend devs, free tier |
| **Claude API** | AI Content Generation | Best for text generation, good context handling |
| **Vercel** | Hosting | Seamless Next.js deployment, edge functions |

---

## 7. Security Considerations

| Concern | Solution |
|---------|----------|
| API Key Exposure | Store Claude API key in server-side env, never expose to client |
| Auth Protection | Clerk middleware protects /dashboard, /create, /preview routes |
| Rate Limiting | Implement rate limiting on AI generation endpoints |
| Input Sanitization | Sanitize user inputs before sending to Claude API |
| Public Portfolios | Only published portfolios accessible via public routes |

---

## 8. Scalability Considerations (Future)

| Aspect | Current (v1) | Future |
|--------|--------------|--------|
| Templates | Single | Multiple selectable templates |
| AI Features | Bio + Project enhance | Skills suggestions, cover letter |
| Export | None | PDF export, custom domain |
| Storage | Supabase | CDN for images, portfolio caching |

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Form completion rate | > 70% |
| AI generation usage | > 90% of users try it |
| Portfolio shares | > 50% create public link |
| Page load time | < 2 seconds |