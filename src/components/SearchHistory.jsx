
const SearchHistory = ({ history, onSelectCity, onClearHistory }) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-white/80">Recent Searches</h3>
        <button
          onClick={onClearHistory}
          className="text-xs text-white/60 hover:text-white"
        >
          Clear History
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {history.map(city => (
          <button
            key={city}
            onClick={() => onSelectCity(city)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
