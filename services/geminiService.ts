import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SERVICES } from "../constants";

export const diagnoseProblem = async (problemDescription: string): Promise<{ text: string, recommendedServiceId?: string }> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return { text: "API Key is missing. Please configure the environment." };
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Construct a context-aware prompt using our available services
    const servicesContext = SERVICES.map(s => `ID: ${s.id}, Name: ${s.title}, Desc: ${s.description}`).join('\n');
    
    const prompt = `
      You are an expert robotics repair technician AI.
      User problem: "${problemDescription}"
      
      Available Services:
      ${servicesContext}
      
      1. Analyze the problem.
      2. Recommend the single most relevant service ID from the list if applicable.
      3. Explain why briefly (under 50 words).
      4. If no service matches, suggest a general diagnostic.
      
      Format output as JSON:
      {
        "explanation": "string",
        "recommendedServiceId": "string or null"
      }
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from AI");
    }

    const parsed = JSON.parse(responseText);
    return {
      text: parsed.explanation,
      recommendedServiceId: parsed.recommendedServiceId
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "I'm having trouble connecting to the diagnostic server. Please try again." };
  }
};