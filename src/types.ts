export interface FoodAnalysis {
  foodType: string;
  ingredients: string[];
  macronutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
  preservatives: string[];
  pregnancySafetyScore: number;
  pregnancySafetyNotes: string;
  description?: string;
}