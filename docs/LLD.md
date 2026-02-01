# Low-Level Design (LLD)
## AI Portfolio Generator

---

## 1. Project Structure

```
portfolio-generator/
├── .env.local                    # Environment variables (secrets)
├── .env.example                  # Template for env vars
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout with Clerk provider
│   │   ├── page.tsx              # Landing page
│   │   ├── globals.css
│   │   │LL
│   │   ├── (auth)/               # Auth group (Clerk pages)
│   │   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   │   └── sign-up/[[...sign-up]]/page.tsx
│   │   │
│   │   ├── (protected)/          # Auth-protected routes
│   │   │   ├── layout.tsx        # Checks auth
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── create/page.tsx   # Multi-step form
│   │   │   └── preview/page.tsx  # Portfolio preview + edit
│   │   │
│   │   ├── p/                    # Public portfolio routes
│   │   │   └── [username]/page.tsx
│   │   │
│   │   └── api/                  # API Routes
│   │       ├── profile/
│   │       │   └── route.ts      # GET, POST, PUT user profile
│   │       ├── portfolio/
│   │       │   ├── route.ts      # Save/update portfolio
│   │       │   └── [username]/route.ts  # Get public portfolio
│   │       └── ai/
│   │           ├── generate-bio/route.ts
│   │           └── enhance-project/route.ts
│   │
│   ├── components/
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── StepIndicator.tsx
│   │   │
│   │   ├── forms/                # Form step components
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   └── ProjectsForm.tsx
│   │   │
│   │   ├── portfolio/            # Portfolio display components
│   │   │   ├── PortfolioTemplate.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   └── ProjectsSection.tsx
│   │   │
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useFormStore.ts       # Zustand store for form state
│   │   ├── useAIGeneration.ts    # Hook for AI API calls
│   │   └── usePortfolio.ts       # Hook for portfolio CRUD
│   │
│   ├── lib/                      # Utilities and configs
│   │   ├── supabase.ts           # Supabase client
│   │   ├── claude.ts             # Claude API helper
│   │   ├── prompts.ts            # AI prompt templates
│   │   └── utils.ts              # Helper functions
│   │
│   ├── types/                    # TypeScript types
│   │   └── index.ts
│   │
│   └── middleware.ts             # Clerk auth middleware
│
└── supabase/
    └── migrations/               # Database migrations
        └── 001_initial_schema.sql
```

---

## 2. Database Schema (Supabase PostgreSQL)

### 2.1 ER Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     users       │       │   portfolios    │       │   experiences   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──────▶│ id (PK)         │◀──────│ id (PK)         │
│ clerk_id (UQ)   │       │ user_id (FK)    │       │ portfolio_id(FK)│
│ email           │       │ username (UQ)   │       │ company         │
│ created_at      │       │ personal_info   │       │ role            │
│ updated_at      │       │ generated_bio   │       │ start_date      │
└─────────────────┘       │ skills          │       │ end_date        │
                          │ is_published    │       │ description     │
                          │ created_at      │       │ enhanced_desc   │
                          │ updated_at      │       └─────────────────┘
                          └─────────────────┘
                                   │
                                   │
                          ┌─────────────────┐
                          │    projects     │
                          ├─────────────────┤
                          │ id (PK)         │
                          │ portfolio_id(FK)│
                          │ title           │
                          │ description     │
                          │ enhanced_desc   │
                          │ tech_stack      │
                          │ live_url        │
                          │ github_url      │
                          └─────────────────┘
```

### 2.2 SQL Schema

```sql
-- Users table (synced with Clerk)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolios table
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE,  -- for public URL /p/username
    
    -- Personal Info (JSON for flexibility)
    personal_info JSONB DEFAULT '{}'::jsonb,
    /*
    personal_info structure:
    {
        "full_name": "John Doe",
        "title": "Senior Frontend Developer",
        "email": "john@example.com",
        "phone": "+91-9876543210",
        "location": "Bangalore, India",
        "linkedin_url": "https://linkedin.com/in/johndoe",
        "github_url": "https://github.com/johndoe",
        "summary": "User's self-written summary (optional)"
    }
    */
    
    -- AI Generated Content
    generated_bio TEXT,           -- AI-generated professional bio
    
    -- Skills (array)
    skills TEXT[] DEFAULT '{}',
    
    -- Publishing
    is_published BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,               -- NULL if current job
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,            -- User's original description
    enhanced_description TEXT,   -- AI-enhanced description
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,            -- User's original description
    enhanced_description TEXT,   -- AI-enhanced description
    tech_stack TEXT[] DEFAULT '{}',
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    image_url VARCHAR(500),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX idx_portfolios_username ON portfolios(username);
CREATE INDEX idx_experiences_portfolio_id ON experiences(portfolio_id);
CREATE INDEX idx_projects_portfolio_id ON projects(portfolio_id);

-- Row Level Security (RLS)
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policies (users can only access their own data)
CREATE POLICY "Users can view own portfolio" ON portfolios
    FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own portfolio" ON portfolios
    FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own portfolio" ON portfolios
    FOR UPDATE USING (auth.uid()::text = user_id::text);

-- Public portfolios are viewable by anyone
CREATE POLICY "Public portfolios are viewable" ON portfolios
    FOR SELECT USING (is_published = TRUE);
```

---

## 3. TypeScript Types

```typescript
// src/types/index.ts

// Personal Info
export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  summary?: string;
}

// Experience
export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: string;        // ISO date string
  endDate?: string;
  isCurrent: boolean;
  description: string;
  enhancedDescription?: string;  // AI-generated
}

// Project
export interface Project {
  id?: string;
  title: string;
  description: string;
  enhancedDescription?: string;  // AI-generated
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

// Complete Portfolio
export interface Portfolio {
  id?: string;
  userId?: string;
  username?: string;
  personalInfo: PersonalInfo;
  generatedBio?: string;    // AI-generated
  skills: string[];
  experiences: Experience[];
  projects: Project[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Form State (for multi-step form)
export interface FormState {
  currentStep: number;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: string[];
  projects: Project[];
  isGenerating: boolean;
  generatedBio?: string;
}

// AI Generation Request/Response
export interface GenerateBioRequest {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  skills: string[];
}

export interface GenerateBioResponse {
  bio: string;
  success: boolean;
  error?: string;
}

export interface EnhanceProjectRequest {
  project: Project;
  context: {
    userTitle: string;
    skills: string[];
  };
}

export interface EnhanceProjectResponse {
  enhancedDescription: string;
  success: boolean;
  error?: string;
}
```

---

## 4. API Contracts

### 4.1 AI Endpoints

#### POST /api/ai/generate-bio

Generate professional bio from user data.

**Request:**
```json
{
  "personalInfo": {
    "fullName": "John Doe",
    "title": "Senior Frontend Developer",
    "location": "Bangalore, India"
  },
  "experiences": [
    {
      "company": "TechCorp",
      "role": "Frontend Developer",
      "startDate": "2020-01-01",
      "isCurrent": true,
      "description": "Built React applications"
    }
  ],
  "skills": ["React", "TypeScript", "Next.js"]
}
```

**Response (Success):**
```json
{
  "success": true,
  "bio": "John Doe is a Senior Frontend Developer based in Bangalore with over 4 years of experience building modern web applications. Currently at TechCorp, John specializes in React and TypeScript, creating performant and user-friendly interfaces. His expertise in Next.js enables him to deliver full-stack solutions that drive business results..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Failed to generate bio. Please try again."
}
```

---

#### POST /api/ai/enhance-project

Enhance a project description with AI.

**Request:**
```json
{
  "project": {
    "title": "E-commerce Dashboard",
    "description": "Built a dashboard for online store",
    "techStack": ["React", "Chart.js", "Node.js"]
  },
  "context": {
    "userTitle": "Senior Frontend Developer",
    "skills": ["React", "TypeScript"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "enhancedDescription": "Architected and developed a comprehensive e-commerce analytics dashboard that provides real-time insights into sales performance, inventory management, and customer behavior. Implemented interactive data visualizations using Chart.js, enabling stakeholders to make data-driven decisions. The responsive React interface handles 10,000+ daily transactions with optimal performance."
}
```

---

### 4.2 Portfolio Endpoints

#### GET /api/portfolio
Get current user's portfolio.

#### POST /api/portfolio
Create new portfolio.

#### PUT /api/portfolio
Update existing portfolio.

#### GET /api/portfolio/[username]
Get public portfolio by username.

---

## 5. AI Prompt Templates

```typescript
// src/lib/prompts.ts

export const BIO_GENERATION_PROMPT = `
You are a professional resume writer. Generate a compelling professional bio for a portfolio website.

USER INFORMATION:
- Name: {{fullName}}
- Current Title: {{title}}
- Location: {{location}}

EXPERIENCE:
{{#each experiences}}
- {{role}} at {{company}} ({{startDate}} - {{#if isCurrent}}Present{{else}}{{endDate}}{{/if}})
  {{description}}
{{/each}}

SKILLS: {{skills}}

INSTRUCTIONS:
1. Write a 2-3 paragraph professional bio in third person
2. Highlight key achievements and expertise areas
3. Make it engaging and suitable for a portfolio website
4. Focus on impact and value, not just responsibilities
5. Keep it concise (150-200 words)
6. Do not include any placeholder text or brackets

OUTPUT FORMAT:
Return only the bio text, no additional formatting or labels.
`;

export const PROJECT_ENHANCEMENT_PROMPT = `
You are a technical writer specializing in portfolio content. Enhance this project description to be more impactful.

PROJECT:
- Title: {{title}}
- Original Description: {{description}}
- Tech Stack: {{techStack}}

USER CONTEXT:
- Role: {{userTitle}}
- Key Skills: {{skills}}

INSTRUCTIONS:
1. Expand the description to 2-3 sentences
2. Highlight technical challenges solved
3. Emphasize impact and results (use metrics if reasonable to assume)
4. Use action verbs (Architected, Implemented, Optimized, etc.)
5. Keep it professional and concise
6. Do not make up specific numbers unless they're clearly implied

OUTPUT FORMAT:
Return only the enhanced description text.
`;

export const SKILL_SUGGESTION_PROMPT = `
Based on the user's experience and current skills, suggest additional relevant skills.

CURRENT TITLE: {{title}}
CURRENT SKILLS: {{skills}}
EXPERIENCE AREAS: {{experienceAreas}}

Suggest 5-10 relevant skills they might have but haven't listed.
Return as a JSON array: ["skill1", "skill2", ...]
`;
```

---

## 6. State Management (Zustand)

```typescript
// src/hooks/useFormStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FormState, PersonalInfo, Experience, Project } from '@/types';

interface FormStore extends FormState {
  // Actions
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Experiences
  addExperience: (exp: Experience) => void;
  updateExperience: (index: number, exp: Experience) => void;
  removeExperience: (index: number) => void;
  
  // Skills
  setSkills: (skills: string[]) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  
  // Projects
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  removeProject: (index: number) => void;
  
  // AI
  setGeneratedBio: (bio: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  
  // Reset
  resetForm: () => void;
}

const initialState: FormState = {
  currentStep: 0,
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
  },
  experiences: [],
  skills: [],
  projects: [],
  isGenerating: false,
  generatedBio: undefined,
};

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      ...initialState,
      
      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ 
        currentStep: Math.min(state.currentStep + 1, 3) 
      })),
      prevStep: () => set((state) => ({ 
        currentStep: Math.max(state.currentStep - 1, 0) 
      })),
      
      updatePersonalInfo: (info) => set((state) => ({
        personalInfo: { ...state.personalInfo, ...info }
      })),
      
      addExperience: (exp) => set((state) => ({
        experiences: [...state.experiences, exp]
      })),
      updateExperience: (index, exp) => set((state) => ({
        experiences: state.experiences.map((e, i) => i === index ? exp : e)
      })),
      removeExperience: (index) => set((state) => ({
        experiences: state.experiences.filter((_, i) => i !== index)
      })),
      
      setSkills: (skills) => set({ skills }),
      addSkill: (skill) => set((state) => ({
        skills: [...state.skills, skill]
      })),
      removeSkill: (skill) => set((state) => ({
        skills: state.skills.filter((s) => s !== skill)
      })),
      
      addProject: (project) => set((state) => ({
        projects: [...state.projects, project]
      })),
      updateProject: (index, project) => set((state) => ({
        projects: state.projects.map((p, i) => i === index ? project : p)
      })),
      removeProject: (index) => set((state) => ({
        projects: state.projects.filter((_, i) => i !== index)
      })),
      
      setGeneratedBio: (bio) => set({ generatedBio: bio }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      
      resetForm: () => set(initialState),
    }),
    {
      name: 'portfolio-form-storage',
    }
  )
);
```

---

## 7. Claude API Integration

```typescript
// src/lib/claude.ts

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function generateWithClaude(
  prompt: string,
  maxTokens: number = 1000
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const textContent = response.content.find(
      (block) => block.type === 'text'
    );
    
    if (textContent && textContent.type === 'text') {
      return textContent.text;
    }
    
    throw new Error('No text content in response');
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

// Helper to replace template variables
export function fillPromptTemplate(
  template: string,
  variables: Record<string, any>
): string {
  let filled = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    filled = filled.replace(regex, String(value));
  }
  
  return filled;
}
```

---

## 8. Environment Variables

```bash
# .env.example

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/create

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Claude API
CLAUDE_API_KEY=sk-ant-xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 9. Key Implementation Notes

### 9.1 AI Call Optimization
- Call bio generation and project enhancement in parallel using `Promise.all`
- Show loading states per section (bio generating, projects enhancing)
- Cache AI results to avoid re-generating on page refresh (Zustand persist)

### 9.2 Error Handling
- Wrap all AI calls in try-catch
- Show user-friendly error messages
- Allow retry on failure
- Log errors to console for debugging

### 9.3 Form Validation
- Use Zod for schema validation
- Validate before each step transition
- Validate before AI generation
- Show inline errors

### 9.4 Security Checklist
- [ ] Claude API key only in server-side code
- [ ] Clerk middleware on protected routes
- [ ] Supabase RLS policies enabled
- [ ] Input sanitization before AI prompts
- [ ] Rate limiting on AI endpoints