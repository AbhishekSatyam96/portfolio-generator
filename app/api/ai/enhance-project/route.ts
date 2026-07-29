import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude, fillPromptTemplate } from "@/lib/claude";
import { PROJECT_ENHANCEMENT_PROMPT } from "@/lib/prompts";
import type { EnhanceProjectRequest, EnhanceProjectResponse } from "@/types";

export async function POST(request: NextRequest): Promise<NextResponse<EnhanceProjectResponse>> {
  try {
    const body: EnhanceProjectRequest = await request.json();
    const { project, context } = body;

    // Validate required fields
    if (!project?.title || !project?.description) {
      return NextResponse.json(
        {
          success: false,
          enhancedDescription: "",
          error: "Project title and description are required",
        },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = fillPromptTemplate(PROJECT_ENHANCEMENT_PROMPT, {
      title: project.title,
      description: project.description,
      techStack: project.techStack?.join(", ") || "Not specified",
      userTitle: context?.userTitle || "Developer",
      skills: context?.skills?.join(", ") || "Not specified",
    });

    // Generate enhanced description using Claude (target output is 2-4
    // sentences; the rest of the budget is headroom for adaptive thinking)
    const enhancedDescription = await generateWithClaude(prompt, 1500);

    return NextResponse.json({
      success: true,
      enhancedDescription: enhancedDescription.trim(),
    });
  } catch (error) {
    console.error("Enhance project error:", error);
    return NextResponse.json(
      {
        success: false,
        enhancedDescription: "",
        error: "Failed to enhance project. Please try again.",
      },
      { status: 500 }
    );
  }
}
