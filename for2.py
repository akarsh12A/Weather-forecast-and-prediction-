import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
from sklearn.preprocessing import StandardScaler
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderUnavailable

class LocationManager:
    def __init__(self):
        self.geolocator = Nominatim(user_agent="weather_prediction_system")
        
    def get_coordinates(self, location_name):
        """
        Get coordinates for any location in the world
        Returns tuple of (latitude, longitude, formatted_address) or None if not found
        """
        try:
            location = self.geolocator.geocode(location_name)
            if location:
                return (location.latitude, location.longitude, location.address)
            return None
        except (GeocoderTimedOut, GeocoderUnavailable):
            print("Error: Location service timed out. Please try again.")
            return None

def plot_heatmap(data, title="Heatmap", xlabel="Weather Parameters", ylabel="Time Steps"):
    """
    Generate a heatmap using seaborn and matplotlib
    """
    plt.figure(figsize=(12, 6))
    sns.heatmap(data, annot=True, cmap='coolwarm', fmt='.2f', cbar=True, linewidths=0.5,
                xticklabels=["Temperature (°C)", "Pressure (hPa)", "Humidity (%)", "Wind Speed (km/h)"])
    plt.title(title)
    plt.xlabel(xlabel)
    plt.ylabel(ylabel)
    plt.show()

def generate_weather_data(n_samples=10, latitude=0):
    """
    Simulate weather data for n_samples with latitude-based adjustments
    """
    np.random.seed(42)
    
    # Adjust temperature based on latitude (rough approximation)
    base_temp = 25 - abs(latitude) * 0.5  # Temperature decreases with distance from equator
    
    temperature = np.random.normal(base_temp, 5, n_samples)
    pressure = np.random.normal(1013, 10, n_samples)
    
    # Adjust humidity based on latitude (rough approximation)
    base_humidity = 60 - abs(latitude) * 0.3
    humidity = np.clip(np.random.normal(base_humidity, 10, n_samples), 0, 100)
    
    wind_speed = np.random.normal(15, 5, n_samples)
    
    weather_data = np.column_stack((temperature, pressure, humidity, wind_speed))
    return weather_data

def visualize_weather_attributes(latitude):
    """
    Generate and visualize heatmaps of weather attributes
    """
    weather_data = generate_weather_data(n_samples=10, latitude=latitude)
    
    # Original data heatmap
    plot_heatmap(weather_data, title="Weather Parameters Over Time", 
                xlabel="Weather Parameters", ylabel="Time Steps")
    
    # Standardized data heatmap
    scaler = StandardScaler()
    scaled_weather_data = scaler.fit_transform(weather_data)
    plot_heatmap(scaled_weather_data, title="Standardized Weather Parameters Over Time", 
                xlabel="Weather Parameters", ylabel="Time Steps")

def main():
    try:
        print("Welcome to the Global Weather Prediction System!")
        print("\nYou can enter any location in the world (city, country, landmark, etc.)")
        print("Examples: 'Paris, France', 'Mount Everest', 'Sydney Opera House', 'Central Park, New York'")
        
        location_manager = LocationManager()
        
        while True:
            # Get location input
            location_input = input("\nEnter location (or 'exit' to quit): ").strip()
            
            if location_input.lower() == 'exit':
                print("\nThank you for using the Global Weather Prediction System!")
                break
            
            # Get coordinates
            result = location_manager.get_coordinates(location_input)
            
            if result:
                latitude, longitude, address = result
                print(f"\nFound location: {address}")
                print(f"Coordinates: Latitude {latitude:.4f}, Longitude {longitude:.4f}")
                
                # Generate and display weather visualization
                visualize_weather_attributes(latitude)
                
                continue_analysis = input("\nWould you like to analyze another location? (yes/no): ")
                if continue_analysis.lower() != 'yes':
                    print("\nThank you for using the Global Weather Prediction System!")
                    break
            else:
                print(f"\nLocation '{location_input}' not found. Please try again with a different location name.")
                print("Tips:")
                print("- Include country name for better accuracy (e.g., 'Rome, Italy')")
                print("- Check spelling and try to be more specific")
                print("- Use well-known landmarks or city centers")
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        print("Please try again.")

if __name__ == "__main__":
    main()