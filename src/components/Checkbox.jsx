const Checkbox = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div className="w-6 h-4 rounded-md border border-gray-300 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200 relative">
        <div className="absolute inset-0 bg-transparent peer-checked:bg-opacity-40 peer-hover:bg-gray-100 rounded-lg transition-all"></div>
      </div>
    </label>
  );
};

export default Checkbox;
