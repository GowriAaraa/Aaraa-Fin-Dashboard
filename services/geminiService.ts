import { GoogleGenAI, Type } from "@google/genai";
import { FinancialData, AnalysisResult } from "../types";

// Initialize Gemini
// Note: In a real production app, ensure API keys are handled securely via backend proxy.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeProjectFinances = async (data: FinancialData, projectName: string): Promise<AnalysisResult> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Prepare the prompt
    const prompt = `
      Analyze the following financial data for the construction project "${projectName}".
      Provide a brief executive summary, assess the financial risk level, and give a one-sentence strategic recommendation.
      
      Data:
      - Budget: ${data.currency} ${data.budget}
      - Total Expenses: ${data.currency} ${data.totalExpenses}
      - Wages: ${data.currency} ${data.wages}
      - Material Costs: ${data.currency} ${data.materialUsed}
      - Balance: ${data.currency} ${data.runningBalance}
      - Pending Approvals: ${data.pendingApprovals}
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A concise 1-2 sentence summary of the financial health." },
            riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"], description: "The calculated risk level based on budget usage and balance." },
            recommendation: { type: Type.STRING, description: "A strategic action item for the project manager." }
          },
          required: ["summary", "riskLevel", "recommendation"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback if API fails or key is missing
    return {
      summary: "AI Analysis unavailable. Please review manual reports.",
      riskLevel: "Medium",
      recommendation: "Check network connection or API configuration."
    };
  }
};