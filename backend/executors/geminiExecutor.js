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
    const httpData = context.outputs["node-2"] || {};
    // const previousOutput = Object.values(context.outputs).at(-1);
    const finalPrompt = `${prompt}HTTP Response:${JSON.stringify(httpData, null, 2)}`;
    const result = await genAI.models.generateContent({
      model,
      contents: finalPrompt,
      config: {
        temperature,
        maxOutputTokens,
      },
    });
    return {
      success: true,
      nodeId: node.id,
      nodeType: node.type,
      model,
      output: result.text,
    };
  } catch (error) {
    return {
      success: false,
      nodeId: node?.id,
      nodeType: node?.type,
      error: error.message,
    };

  }
};