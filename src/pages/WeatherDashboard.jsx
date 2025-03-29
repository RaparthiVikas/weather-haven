
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "../components/theme-toggle";
import { useToast } from "../hooks/use-toast";
import ErrorDisplay from "../components/ErrorDisplay";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import SearchHistory from "../components/SearchHistory";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { 
  getCurrentWeather, 
  getForecast, 
  getWeatherBackground 
} from "../services/weatherService";

const WeatherDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [backgroundClass, setBackgroundClass] = useState("weather-gradient-day");
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();
  const { toast } = useToast();

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
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to fetch weather data",
      });
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
    <div 
      className={`min-h-screen flex flex-col items-center transition-colors ${backgroundClass} p-4 md:p-8`}
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="flex items-center justify-between w-full mb-8">
          <h1 className="text-2xl font-bold text-white">Weather Haven</h1>
          <ThemeToggle />
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
            <div className="animate-pulse-slow flex flex-col items-center gap-4 text-white">
              <div className="h-20 w-20 rounded-full border-4 border-t-transparent border-white animate-spin" />
              <p>Fetching weather data...</p>
            </div>
          )}
          
          {weatherData && !isLoading && !error && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="w-full flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Refresh
                </Button>
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
