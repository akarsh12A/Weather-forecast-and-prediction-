import React from 'react';
import { Sun, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  condition,
  humidity,
  windSpeed,
}) => {
  return (
    <div className="w-full p-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg text-white mb-6 transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold">{location}</h2>
        <p className="text-4xl font-bold">{temperature}°C</p>
        <p className="text-md mt-1">{condition}</p>
      </div>
      <div className="flex justify-around mt-4">
        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5" />
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="w-5 h-5" />
          <span>{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;