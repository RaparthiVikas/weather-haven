
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
  dt: number;
  cod: number;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
  };
}

// Replace with your actual API key
const API_KEY = "085a5da4e36a403c1a037a1e0ba91df7";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch weather data");
  }
  
  return response.json();
}

export async function getForecast(city: string): Promise<ForecastData> {
  const response = await fetch(
    `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch forecast data");
  }
  
  return response.json();
}

export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function getDayFromTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function getWeatherBackground(weatherCondition: string): string {
  switch (weatherCondition.toLowerCase()) {
    case "clear":
      return "weather-gradient-day";
    case "clouds":
      return "weather-gradient-cloudy";
    case "rain":
    case "drizzle":
    case "thunderstorm":
      return "weather-gradient-rainy";
    default:
      return "weather-gradient-day";
  }
}
