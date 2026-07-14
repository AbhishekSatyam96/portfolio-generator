import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export async function generateWithClaude(
  prompt: string,
  maxTokens: number = 1000
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",
      max_tokens: maxTokens,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Extract text from response
    const textContent = response.content.find((block) => block.type === "text");

    if (textContent && textContent.type === "text") {
      return textContent.text;
    }

    throw new Error("No text content in response");
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
}

// Helper to replace template variables in prompts
export function fillPromptTemplate(
  template: string,
  variables: Record<string, unknown>
): string {
  let filled = template;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, "g");
    if (Array.isArray(value)) {
      filled = filled.replace(regex, value.join(", "));
    } else {
      filled = filled.replace(regex, String(value ?? ""));
    }
  }

  return filled;
}
