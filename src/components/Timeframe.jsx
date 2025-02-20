const TimeframeDropdown = ({ timeframe, setTimeframe }) => {
    const options = [
      { label: "This Year", value: "thisYear" },
      { label: "Last Year", value: "lastYear" },
      { label: "This Month", value: "thisMonth" },
      { label: "Last Month", value: "lastMonth" },
    ];
  
    return (
      <div className="relative">
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="appearance-none bg-transparent backdrop-blur-md border border-gray-300 text-gray-700 text-sm font-medium rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-black">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default TimeframeDropdown;
  