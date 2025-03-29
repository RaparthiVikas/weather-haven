
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import SearchHistory from "../components/SearchHistory";
import ErrorDisplay from "../components/ErrorDisplay";
import { getCurrentWeather, getForecast, getWeatherBackground } from "../services/weatherService";

const WeatherDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState("weather-gradient-day");
  const [searchHistory, setSearchHistory] = useState([]);

  const addToHistory = (city) => {
    if (!searchHistory.includes(city)) {
      setSearchHistory(prev => [city, ...prev.slice(0, 4)]);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const handleSearch = async (city) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Fetch current weather
      const weather = await getCurrentWeather(city);
      setWeatherData(weather);
      setBackgroundClass(getWeatherBackground(weather.weather[0].main));
      
      // Fetch forecast
      const forecast = await getForecast(city);
      
      // Process forecast data to get one entry per day
      const dailyForecast = forecast.list
        .filter((_, index) => index % 8 === 0) // Get one forecast per day
        .slice(0, 5) // Limit to 5 days
        .map(item => ({
          day: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
          date: item.dt,
          temperature: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        }));
      
      setForecastData(dailyForecast);
      
      // Add to search history
      addToHistory(weather.name);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather data");
      alert(err instanceof Error ? err.message : "Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    if (weatherData) {
      handleSearch(weatherData.name);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors ${backgroundClass} p-4 md:p-8`}>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="flex items-center justify-between w-full mb-8">
          <h1 className="text-2xl font-bold text-white">Weather Haven</h1>
        </header>
        
        <main className="w-full flex flex-col items-center gap-6">
          <div className="w-full flex flex-col items-center gap-4">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            
            {searchHistory.length > 0 && !isLoading && (
              <SearchHistory 
                history={searchHistory} 
                onSelectCity={handleSearch} 
                onClearHistory={clearHistory} 
              />
            )}
          </div>
          
          {error && <ErrorDisplay message={error} />}
          
          {isLoading && (
            <div className="flex flex-col items-center gap-4 text-white">
              <div className="h-20 w-20 rounded-full border-4 border-t-transparent border-white animate-spin"></div>
              <p>Fetching weather data...</p>
            </div>
          )}
          
          {weatherData && !isLoading && !error && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full flex justify-end">
                <button 
                  onClick={handleRefresh}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-md text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh
                </button>
              </div>
              
              <WeatherCard
                cityName={weatherData.name}
                country={weatherData.sys.country}
                temperature={weatherData.main.temp}
                feelsLike={weatherData.main.feels_like}
                condition={weatherData.weather[0].main}
                description={weatherData.weather[0].description}
                icon={weatherData.weather[0].icon}
                humidity={weatherData.main.humidity}
                windSpeed={weatherData.wind.speed}
                timestamp={weatherData.dt}
              />
              
              {forecastData.length > 0 && (
                <ForecastCard forecast={forecastData} />
              )}
            </div>
          )}
        </main>
        
        <footer className="mt-auto pt-8 text-center text-sm text-white/70">
          <p>Weather Haven Dashboard - Created with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default WeatherDashboard;
