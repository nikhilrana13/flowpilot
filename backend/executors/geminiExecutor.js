import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const GeminiExecutor = async (node, context) => {
  try {
    if (!node) {
      throw new Error("Gemini node is missing");
    }
    const {
      model = "gemini-2.5-flash",
      prompt,
      temperature = 0.7,
      maxOutputTokens = 1024,
    } = node.data || {};

    if (!prompt?.trim()) {
      throw new Error("Prompt is required");
    }

    // Get previous HTTP node output (V1)
    const previousOutput = Object.values(context.outputs).at(-1);
    const finalPrompt = `${prompt} Input Data ${JSON.stringify(previousOutput?.output ?? previousOutput, null, 2)} 
    Instructions:
    Rules:
- The input can be any valid JSON.
- Analyze it according to the prompt.
- Return ONLY valid JSON.
- Do not use markdown.
`;
    const result = await genAI.models.generateContent({
      model,
      contents: finalPrompt,
      config: {
        temperature,
        maxOutputTokens,
      },
    });
    let output = result.text.trim();
    // Remove markdown code blocks
    output = output
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    // Try parsing JSON
    try {
      output = JSON.parse(output);
    } catch {
      // console.log("Failed to parse Gemini output");
      // console.log(output);
    }
    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      model,
      output,
    };
  } catch (error) {
    return {
      success: false,
      nodeId: node?.id,
      nodeType: node?.type,
      error: error.message || "Gemini execution failed",
    };
  }
};
