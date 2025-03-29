
import { DropletIcon, ThermometerIcon, WindIcon } from "lucide-react";
import { getWeatherIconUrl, formatTimestamp } from "../services/weatherService";
import { Card, CardContent, CardHeader } from "./ui/card";

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
  timestamp,
}) => {
  return (
    <Card className="w-full max-w-md overflow-hidden border-none bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <h2 className="text-2xl font-bold">
            {cityName}
            {country && <span className="ml-1 text-xs align-super">{country}</span>}
          </h2>
          <p className="text-sm text-muted-foreground">
            Updated: {formatTimestamp(timestamp)}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{Math.round(temperature)}°C</div>
          <div className="text-sm text-muted-foreground">
            Feels like {Math.round(feelsLike)}°C
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-center gap-2 py-2">
          <img
            src={getWeatherIconUrl(icon)}
            alt={description}
            className="h-16 w-16"
          />
          <div>
            <div className="font-medium capitalize">{condition}</div>
            <div className="text-sm capitalize text-muted-foreground">{description}</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DropletIcon className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium">Humidity</div>
              <div>{humidity}%</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <WindIcon className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm font-medium">Wind Speed</div>
              <div>{windSpeed} km/h</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
