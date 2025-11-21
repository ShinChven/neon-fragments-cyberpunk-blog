import { GoogleGenAI, Type } from "@google/genai";
import { BlogPost } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateCyberpunkPost = async (): Promise<BlogPost> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please configure process.env.API_KEY");
  }

  const model = "gemini-2.5-flash";
  
  const prompt = `
    You are a Netrunner in Cyberpunk 2077. Write a short, cryptic, and edgy blog post about a recent event in Night City.
    Use slang like 'choom', 'gonk', 'eddies', 'ICE', 'preem'.
    The tone should be anti-corporate, gritty, and high-tech.
    Return strictly JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            tags: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            readTime: { type: Type.STRING }
          },
          required: ["title", "content", "tags", "readTime"]
        }
      }
    });

    if (!response.text) {
      throw new Error("No content generated");
    }

    const data = JSON.parse(response.text);
    
    return {
      id: crypto.randomUUID(),
      title: data.title.toUpperCase(),
      content: data.content,
      tags: data.tags.map((t: string) => t.toUpperCase()),
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      author: "AI_CONSTRUCT",
      readTime: data.readTime,
      likes: 0,
      isGlitch: true
    };

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    // Fallback if API fails or key missing
    return {
      id: crypto.randomUUID(),
      title: "CONNECTION_LOST",
      content: "Could not establish link with the subnet. The corporate firewall is blocking our signal. Try again later, choom.",
      tags: ["ERROR", "OFFLINE"],
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      author: "SYSTEM",
      readTime: "0 min",
      likes: 0,
      isGlitch: true
    };
  }
};
