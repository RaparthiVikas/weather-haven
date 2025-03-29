
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch weather data");
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch forecast data");
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getWeatherBackground = (condition) => {
  const lowerCondition = condition.toLowerCase();
  
  if (lowerCondition.includes("clear")) {
    return "weather-gradient-clear";
  } else if (lowerCondition.includes("cloud")) {
    return "weather-gradient-cloudy";
  } else if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle")) {
    return "weather-gradient-rainy";
  } else if (lowerCondition.includes("snow")) {
    return "weather-gradient-snowy";
  } else if (lowerCondition.includes("thunderstorm")) {
    return "weather-gradient-stormy";
  } else if (lowerCondition.includes("fog") || lowerCondition.includes("mist")) {
    return "weather-gradient-foggy";
  } else {
    return "weather-gradient-day";
  }
};
