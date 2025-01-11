import OpenAI from 'openai';
import { FoodAnalysis } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeFoodImage(base64Image: string): Promise<FoodAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Tell me about this meal in JSON format only (no markdown, no explanations) with this structure: { foodType: string, ingredients: string[], macronutrients: { calories: number, protein: number, fat: number, carbs: number }, preservatives: string[], pregnancySafetyScore: number, pregnancySafetyNotes: string }. For the analysis: 1) List all ingredients and any preservatives 2) Calculate macronutrients with a focus on nutrients important during pregnancy (protein, iron, folate) 3) Give a safety score (0-100) specifically for pregnant women, considering: food-borne illness risk, mercury content in seafood, proper cooking/preparation, caffeine content, and any pregnancy-specific concerns 4) In pregnancySafetyNotes, explain any benefits or precautions for pregnant women, including relevant nutrients and safety considerations."
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response content from OpenAI');
    }

    try {
      // Clean up the response by removing any non-JSON content
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const result = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!result.foodType || !result.ingredients || !result.macronutrients || 
          !result.preservatives || typeof result.pregnancySafetyScore !== 'number' || 
          !result.pregnancySafetyNotes) {
        throw new Error('Invalid response structure from OpenAI');
      }
      
      return result as FoodAnalysis;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', content);
      throw new Error('Failed to parse OpenAI response');
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze image');
  }
}