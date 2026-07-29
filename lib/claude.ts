import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

const MODEL = "claude-sonnet-5";

export async function generateWithClaude(
  prompt: string,
  maxTokens: number = 2000
): Promise<string> {
  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      // max_tokens caps thinking *plus* the answer, so budgets need headroom
      // well above the target output length.
      max_tokens: maxTokens,
      thinking: { type: "adaptive" },
      // These are short, tightly-specified rewrites and the user is waiting on
      // a form submit — low effort keeps latency and cost down. Sonnet 5
      // defaults to "high", so setting this explicitly matters.
      output_config: { effort: "low" },
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Sonnet 5 has no server-side fallback targets, so a classifier refusal
    // surfaces here rather than being retried on another model.
    if (response.stop_reason === "refusal") {
      throw new Error("Claude declined to generate content for this input");
    }

    // Extract text from response
    const textContent = response.content.find((block) => block.type === "text");

    if (!textContent || textContent.type !== "text") {
      throw new Error("No text content in response");
    }

    if (response.stop_reason === "max_tokens") {
      throw new Error(
        `Response truncated at ${maxTokens} tokens — raise the budget for this call`
      );
    }

    return textContent.text;
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
