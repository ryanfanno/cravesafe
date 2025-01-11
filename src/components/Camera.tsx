import React, { useCallback, useRef, ChangeEvent } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Upload } from 'lucide-react';

interface CameraProps {
  onCapture: (imageSrc: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onCapture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg shadow-lg"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
        <button
          onClick={capture}
          className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
          title="Take photo"
        >
          <CameraIcon className="w-6 h-6" />
        </button>
        <button
          onClick={triggerFileInput}
          className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors"
          title="Upload image"
        >
          <Upload className="w-6 h-6" />
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};