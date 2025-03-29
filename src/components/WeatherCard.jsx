
const WeatherCard = ({
  cityName,
  country,
  temperature,
  feelsLike,
  condition,
  description,
  icon,
  humidity,
  windSpeed,
  timestamp
}) => {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 text-white border border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">{cityName}, {country}</h2>
          <p className="text-lg opacity-80">{formattedDate}</p>
          <p className="text-sm opacity-70">Last updated: {formattedTime}</p>
        </div>
        
        <div className="flex items-center">
          <img 
            src={iconUrl} 
            alt={description} 
            className="w-16 h-16 md:w-24 md:h-24"
          />
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-bold">{Math.round(temperature)}°C</h3>
            <p className="text-lg capitalize">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-sm opacity-70">Feels Like</p>
          <p className="text-lg font-semibold">{Math.round(feelsLike)}°C</p>
        </div>
        
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-sm opacity-70">Humidity</p>
          <p className="text-lg font-semibold">{humidity}%</p>
        </div>
        
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-sm opacity-70">Wind Speed</p>
          <p className="text-lg font-semibold">{windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
