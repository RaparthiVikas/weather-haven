
import { History, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const SearchHistory = ({
  history,
  onSelectCity,
  onClearHistory,
}) => {
  if (!history.length) return null;
  
  return (
    <Card className="w-full max-w-md overflow-hidden border-none bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <History size={16} />
          Recent Searches
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="h-7 px-2"
        >
          <Trash2 size={14} />
          <span className="sr-only">Clear history</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-wrap gap-2 p-4">
          {history.map((city) => (
            <Button
              key={city}
              variant="secondary"
              size="sm"
              onClick={() => onSelectCity(city)}
              className="h-7 rounded-full"
            >
              {city}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchHistory;
