export const BIO_GENERATION_PROMPT = `You are a professional resume writer. Generate a compelling professional bio for a portfolio website.

USER INFORMATION:
- Name: {{fullName}}
- Current Title: {{title}}
- Location: {{location}}

EXPERIENCE:
{{experienceList}}

SKILLS: {{skills}}

INSTRUCTIONS:
1. Write a 2-3 paragraph professional bio in third person
2. Highlight key achievements and expertise areas
3. Make it engaging and suitable for a portfolio website
4. Focus on impact and value, not just responsibilities
5. Keep it concise (150-200 words)
6. Do not include any placeholder text or brackets
7. Do not start with the person's name - vary your opening

OUTPUT FORMAT:
Return only the bio text, no additional formatting or labels.`;

export const PROJECT_ENHANCEMENT_PROMPT = `You are a technical writer specializing in portfolio content. Enhance this project description to be more impactful.

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
7. Maintain the original project's scope and purpose

OUTPUT FORMAT:
Return only the enhanced description text, no additional formatting or labels.`;

export const EXPERIENCE_ENHANCEMENT_PROMPT = `You are a professional resume writer. Enhance this work experience description to be more impactful.

EXPERIENCE:
- Company: {{company}}
- Role: {{role}}
- Original Description: {{description}}

USER CONTEXT:
- Current Title: {{userTitle}}
- Key Skills: {{skills}}

INSTRUCTIONS:
1. Expand the description to 2-4 sentences
2. Use strong action verbs (Led, Architected, Delivered, Optimized, etc.)
3. Highlight achievements and quantifiable results where reasonable
4. Focus on impact and value delivered
5. Keep it professional and suitable for a portfolio
6. Do not make up specific numbers unless clearly implied
7. Maintain the original role's scope

OUTPUT FORMAT:
Return only the enhanced description text, no additional formatting or labels.`;

export const SKILL_SUGGESTION_PROMPT = `Based on the user's experience and current skills, suggest additional relevant skills they might have.

CURRENT TITLE: {{title}}
CURRENT SKILLS: {{skills}}
EXPERIENCE AREAS: {{experienceAreas}}

Suggest 5-10 relevant skills they might have but haven't listed.
Return as a JSON array only: ["skill1", "skill2", ...]`;

// Helper to format experience list for bio generation
export function formatExperienceList(
  experiences: Array<{
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description: string;
  }>
): string {
  if (experiences.length === 0) {
    return "No experience provided";
  }

  return experiences
    .map((exp) => {
      const endDate = exp.isCurrent ? "Present" : exp.endDate || "N/A";
      return `- ${exp.role} at ${exp.company} (${exp.startDate} - ${endDate})
  ${exp.description}`;
    })
    .join("\n");
}
