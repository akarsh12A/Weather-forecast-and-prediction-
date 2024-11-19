import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async () => {
    if (!location) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5003/predict', { location });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Weather Prediction</h1>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Predict
        </button>

        {loading && <p className="text-center text-gray-600 mt-4">Loading...</p>}
        {prediction !== null && !loading && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Prediction for Extreme Weather:
            </h2>
            <p className="text-2xl font-bold text-blue-600">{prediction.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
