
const ForecastCard = ({ forecast }) => {
  return (
    <div className="w-full bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-lg text-white border border-white/10">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map(item => (
          <div key={item.date} className="bg-white/5 p-3 rounded-lg text-center">
            <p className="font-semibold">{item.day}</p>
            <img 
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} 
              alt={item.description} 
              className="w-16 h-16 mx-auto"
            />
            <p className="text-2xl font-bold">{Math.round(item.temperature)}°C</p>
            <p className="text-sm capitalize opacity-80">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
