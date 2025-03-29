
import { getWeatherIconUrl } from "../services/weatherService";
import { Card, CardContent } from "./ui/card";

const ForecastCard = ({ forecast }) => {
  if (!forecast.length) return null;
  
  return (
    <Card className="w-full max-w-md overflow-hidden border-none bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <h3 className="mb-3 font-medium">5-Day Forecast</h3>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-sm font-medium">{item.day}</div>
              <img 
                src={getWeatherIconUrl(item.icon)} 
                alt={item.description}
                className="h-10 w-10" 
              />
              <div className="mt-1 text-sm">{Math.round(item.temperature)}°</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
