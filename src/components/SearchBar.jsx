
import { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city name..."
        className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
