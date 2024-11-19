import React, { useState } from 'react';

const WelcomeBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
      
      <div className="relative">
        <h2 className="text-2xl font-bold mb-2">Welcome to QuantaWeather</h2>
        <p className="mb-4">
          Experience the future of weather forecasting powered by quantum computing and machine learning.
        </p>
        
        <div className="flex space-x-4">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Take the Tour
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-white/10 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;