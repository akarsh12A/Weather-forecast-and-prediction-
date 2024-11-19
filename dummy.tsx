import React, { useState } from 'react';

type WeatherData = {
    temperature: number[];
    humidity: number[];
    thunderstorm_chance: number[];
};

type Location = {
    address: string;
    lat: number;
    lon: number;
};

const WeatherPrediction: React.FC = () => {
    const [locationQuery, setLocationQuery] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [timestamps, setTimestamps] = useState<string[] | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [plotImage, setPlotImage] = useState<string | null>(null);

    const fetchForecast = async (query?: string) => {
        setError(null);
        setWeatherData(null);
        setTimestamps(null);
        setPlotImage(null);

        try {
            const response = await fetch('http://127.0.0.1:5000/forecast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location: query || locationQuery }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An unknown error occurred.');
                return;
            }

            const data = await response.json();
            setWeatherData(data.weather_data);
            setTimestamps(data.timestamps);
            setPlotImage(data.plot_image);

            if (!query && !locations.some((loc) => loc.address === data.location.address)) {
                setLocations((prevLocations) => [...prevLocations, data.location]);
            }

            setLocation(data.location);
        } catch (err) {
            setError('Failed to fetch data from the server.');
        }
    };

    const handleLocationSelect = (selectedIndex: number) => {
        const selectedLocation = locations[selectedIndex];
        setLocation(selectedLocation);
        fetchForecast(selectedLocation.address);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-5xl mx-auto animate-fade-in">
                <div className="text-center mb-8 transform transition-all duration-700 hover:scale-105">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                        Quantum Weather Forecaster
                    </h1>
                    <p className="text-blue-200 text-lg">
                        Revolutionizing weather forecasts with precision and speed
                    </p>
                </div>

                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-blue-500/30 transform transition-all duration-500 hover:shadow-blue-500/20">
                    <div className="space-y-6">
                        <input
                            type="text"
                            placeholder="Enter a location (e.g., New York)"
                            value={locationQuery}
                            onChange={(e) => setLocationQuery(e.target.value)}
                            className="w-full px-4 py-3 bg-blue-950/50 border border-blue-500/30 rounded-lg 
                            text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 
                            transform transition-all duration-300 focus:scale-105"
                        />

                        <button
                            onClick={() => fetchForecast()}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
                            shadow-lg hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 
                            hover:scale-105 hover:shadow-xl"
                        >
                            Get Forecast
                        </button>
                    </div>

                    {error && (
                        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 
                        animate-bounce">
                            {error}
                        </div>
                    )}

                    {locations.length > 0 && (
                        <div className="mt-6 transform transition-all duration-300 hover:scale-105">
                            <select
                                onChange={(e) => handleLocationSelect(parseInt(e.target.value))}
                                className="w-full px-4 py-3 bg-blue-950/50 border border-blue-500/30 rounded-lg 
                                text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            >
                                <option value="">Select a location</option>
                                {locations.map((location, index) => (
                                    <option key={index} value={index}>
                                        {location.address}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {location && weatherData && (
                        <div className="mt-8 space-y-6 transform transition-opacity duration-500 opacity-100">
                            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r 
                            from-blue-400 to-purple-400">
                                {location.address}
                            </h2>

                            <div className="grid gap-4">
                                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 
                                transform transition-all duration-300 hover:scale-105">
                                    <p className="text-white">
                                        <span className="text-blue-300 font-semibold">Temperature: </span>
                                        {weatherData.temperature.join(', ')}°C
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 
                                transform transition-all duration-300 hover:scale-105">
                                    <p className="text-white">
                                        <span className="text-blue-300 font-semibold">Humidity: </span>
                                        {weatherData.humidity.join(', ')}%
                                    </p>
                                </div>
                                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20 
                                transform transition-all duration-300 hover:scale-105">
                                    <p className="text-white">
                                        <span className="text-blue-300 font-semibold">Thunderstorm Chance: </span>
                                        {weatherData.thunderstorm_chance.join(', ')}%
                                    </p>
                                </div>
                            </div>

                            {plotImage && (
                                <div className="mt-6 transform transition-all duration-500 hover:scale-105">
                                    <h3 className="text-xl font-semibold text-blue-300 mb-4">
                                        Weather Forecast Visualization
                                    </h3>
                                    <div className="rounded-xl overflow-hidden shadow-2xl border border-blue-500/20">
                                        <img
                                            src={`data:image/png;base64,${plotImage}`}
                                            alt="Weather Forecast"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WeatherPrediction;
