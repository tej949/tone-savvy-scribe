
import { tonePrompts } from "./tonePrompts";

const GEMINI_API_KEY = "AIzaSyDO0R-9FhBajxi-TznQ95INqHjzKXEZ50w";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

type EmailResponse = {
  rewrittenEmail: string;
  analysis: {
    items: Array<{
      type: "improvement" | "warning" | "info";
      text: string;
    }>;
    overallTone: string;
  };
};

export async function processEmail(
  originalEmail: string,
  tone: string
): Promise<EmailResponse> {
  const prompt = tonePrompts[tone as keyof typeof tonePrompts];
  
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${prompt}
                
Original email:
"""
${originalEmail}
"""

Return a JSON response with the following structure:
{
  "rewrittenEmail": "The full rewritten email text",
  "analysis": {
    "items": [
      {"type": "improvement", "text": "Description of improvement made"},
      {"type": "warning", "text": "Warning about potential cultural issue"},
      {"type": "info", "text": "General cultural information"}
    ],
    "overallTone": "A short assessment of the original email's tone and key adjustments made"
  }
}
`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    // Extract the JSON part from the response
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format from API");
    }
    
    const result = JSON.parse(jsonMatch[0]);
    
    return {
      rewrittenEmail: result.rewrittenEmail,
      analysis: result.analysis,
    };
  } catch (error) {
    console.error("Error processing email:", error);
    throw error;
  }
}
