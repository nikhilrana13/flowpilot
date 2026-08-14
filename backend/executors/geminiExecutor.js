import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const GeminiExecutor = async (node, context) => {
  try {
    if (!node) {
      throw new Error("Gemini node is missing");
    }

    const {
      model = "gemini-3.6-flash",
      prompt,
      temperature = 0.7,
      maxOutputTokens = 1024,
    } = node.data || {};

    if (!prompt?.trim()) {
      throw new Error("Prompt is required");
    }

    // Get previous node output
    const previousOutput = Object.values(context.outputs).at(-1);

    const inputData =
      previousOutput?.output ?? previousOutput ?? null;

    const finalPrompt = `
${prompt}

Input Data:
${JSON.stringify(inputData, null, 2)}

Instructions:
- The input can be any valid JSON.
- Analyze the input according to the prompt.
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap the response inside \`\`\`json.
- Do not add explanations outside the JSON.
`;

    const interaction = await genAI.interactions.create({
      model,
      input: finalPrompt,

      generation_config: {
        temperature,
        max_output_tokens: maxOutputTokens,
      },

      response_format: [
        {
          type: "text",
          mime_type: "application/json",
        },
      ],
    });

    // Get Gemini output
    let output = interaction.output_text?.trim();

    if (!output) {
      throw new Error("Gemini returned an empty response");
    }
    // Safety: remove markdown code blocks if model still returns them
    output = output
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    // Parse JSON
    try {
      output = JSON.parse(output);
    } catch (parseError) {
      throw new Error(
        `Gemini returned invalid JSON: ${output}`
      );
    }

    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      model,
      output,
    };
  } catch (error) {
    console.error("Gemini Executor Error:", error);

    return {
      success: false,
      nodeId: node?.id,
      nodeType: node?.type,
      error:
        error?.message ||
        "Gemini execution failed",
    };
  }
};