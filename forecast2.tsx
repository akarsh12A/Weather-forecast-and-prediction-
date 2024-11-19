import React, { useState } from 'react';
import axios from 'axios';

const CityInput: React.FC = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setImageUrl('');

    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:5001/get_weather_visualization',
        { city },
        { responseType: 'blob' }
      );

      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <div className="text-center mb-8 transform transition-all duration-700 hover:scale-105">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
            Quantum Weather Predictor
          </h1>
          <p className="text-blue-200 text-lg">
            Revolutionizing weather forecasts with precision and speed
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-blue-500/30 transform transition-all duration-500 hover:shadow-blue-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-105">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-3 bg-blue-950/50 border border-blue-500/30 rounded-lg 
                text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                transform transition-all duration-300 focus:scale-105"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
              shadow-lg hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 
              hover:scale-105 hover:shadow-xl"
            >
              Generate Visualization
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 
            animate-bounce">
              {error}
            </div>
          )}
        </div>

        {imageUrl && (
          <div className="mt-6 w-full bg-blue-950/50 p-6 rounded-xl shadow-lg border border-blue-500/30">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 text-center">
              Weather Visualization
            </h3>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt="Weather Visualization"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityInput;
