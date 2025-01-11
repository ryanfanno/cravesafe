import React from 'react';
import { FoodAnalysis } from '../types';
import { NutritionChart } from './NutritionChart';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AnalysisProps {
  analysis: FoodAnalysis | null;
  imageSrc?: string;
}

export const Analysis: React.FC<AnalysisProps> = ({ analysis, imageSrc }) => {
  if (!analysis) return null;

  const getSafetyColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const generateDescription = () => {
    const ingredients = analysis.ingredients.slice(0, 3).join(', ') + 
      (analysis.ingredients.length > 3 ? ', and more' : '');
    return `This ${analysis.foodType.toLowerCase()} contains ${ingredients}. It provides ${analysis.macronutrients.calories} calories per serving.`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-8">
      <div className="flex items-start gap-6 mb-6">
        {imageSrc && (
          <div className="w-1/3 min-w-[200px]">
            <img 
              src={imageSrc} 
              alt={analysis.foodType}
              className="w-full h-auto rounded-lg shadow-sm object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{analysis.foodType}</h2>
          <p className="text-gray-600 mb-4">{generateDescription()}</p>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Pregnancy Safety Score</h3>
            <div className={`text-4xl font-bold ${getSafetyColor(analysis.pregnancySafetyScore)}`}>
              {analysis.pregnancySafetyScore}/100
            </div>
            <div className="mt-2 flex items-center gap-2">
              {analysis.pregnancySafetyScore >= 70 ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <AlertTriangle className="text-yellow-500" />
              )}
              <p>{analysis.pregnancySafetyNotes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Macronutrients</h3>
        <NutritionChart macros={{
          protein: analysis.macronutrients.protein,
          fat: analysis.macronutrients.fat,
          carbs: analysis.macronutrients.carbs
        }} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-gray-600">Calories</p>
            <p className="font-semibold">{analysis.macronutrients.calories} kcal</p>
          </div>
          <div>
            <p className="text-gray-600">Protein</p>
            <p className="font-semibold">{analysis.macronutrients.protein}g</p>
          </div>
          <div>
            <p className="text-gray-600">Fat</p>
            <p className="font-semibold">{analysis.macronutrients.fat}g</p>
          </div>
          <div>
            <p className="text-gray-600">Carbs</p>
            <p className="font-semibold">{analysis.macronutrients.carbs}g</p>
          </div>
        </div>
      </div>

      {analysis.preservatives.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Preservatives</h3>
          <ul className="list-disc list-inside">
            {analysis.preservatives.map((preservative, index) => (
              <li key={index} className="text-gray-600">{preservative}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <ul className="list-disc list-inside">
          {analysis.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};