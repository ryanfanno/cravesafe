import React, { useState } from 'react';
import { Camera } from './components/Camera';
import { Analysis } from './components/Analysis';
import { FoodAnalysis } from './types';
import { analyzeFoodImage } from './services/openai';
import { ScanLine } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleCapture = async (imageSrc: string) => {
    try {
      setLoading(true);
      setCurrentImage(imageSrc);
      const result = await analyzeFoodImage(imageSrc);
      setAnalysis(result);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ScanLine className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">AI Food Scanner</h1>
          </div>
          <p className="text-gray-600">
            Scan your food or product to get detailed nutritional information and pregnancy safety analysis
          </p>
        </header>

        <Camera onCapture={handleCapture} />

        {loading && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing your image...</p>
          </div>
        )}

        {analysis && <Analysis analysis={analysis} imageSrc={currentImage || undefined} />}
      </div>
    </div>
  );
}

export default App;