import { NextRequest, NextResponse } from "next/server";
import { generateWithClaude, fillPromptTemplate } from "@/lib/claude";
import { BIO_GENERATION_PROMPT, formatExperienceList } from "@/lib/prompts";
import type { GenerateBioRequest, GenerateBioResponse } from "@/types";

export async function POST(request: NextRequest): Promise<NextResponse<GenerateBioResponse>> {
  try {
    const body: GenerateBioRequest = await request.json();
    const { personalInfo, experiences, skills } = body;

    // Validate required fields
    if (!personalInfo?.fullName || !personalInfo?.title) {
      return NextResponse.json(
        {
          success: false,
          bio: "",
          error: "Name and title are required",
        },
        { status: 400 }
      );
    }

    // Build the prompt
    const prompt = fillPromptTemplate(BIO_GENERATION_PROMPT, {
      fullName: personalInfo.fullName,
      title: personalInfo.title,
      location: personalInfo.location || "Not specified",
      experienceList: formatExperienceList(experiences || []),
      skills: skills?.join(", ") || "Not specified",
    });

    // Generate bio using Claude (target output is 150-200 words; the rest of
    // the budget is headroom for adaptive thinking)
    const bio = await generateWithClaude(prompt, 2000);

    return NextResponse.json({
      success: true,
      bio: bio.trim(),
    });
  } catch (error) {
    console.error("Generate bio error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        bio: "",
        error: `Failed to generate bio: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
