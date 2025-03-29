
import { useState, FormEvent } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-8"
          disabled={isLoading}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
      <Button type="submit" disabled={!query.trim() || isLoading}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Searching...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search size={16} />
            Search
          </span>
        )}
      </Button>
    </form>
  );
}
