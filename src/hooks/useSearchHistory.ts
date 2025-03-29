
import { useState, useEffect } from "react";

const HISTORY_KEY = "weather-search-history";
const MAX_HISTORY = 5;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (city: string) => {
    if (!city) return;
    
    setSearchHistory((prevHistory) => {
      // Remove if it exists already
      const filteredHistory = prevHistory.filter(
        (item) => item.toLowerCase() !== city.toLowerCase()
      );
      // Add to the beginning and limit to MAX_HISTORY items
      return [city, ...filteredHistory].slice(0, MAX_HISTORY);
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  return { searchHistory, addToHistory, clearHistory };
}
