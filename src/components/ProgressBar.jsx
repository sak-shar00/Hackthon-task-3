const ProgressBar = ({ current, total }) => {
  const percent = (current / total) * 100;

  return (
    <div className="w-full bg-gray-300 h-2 rounded mt-4">
      <div
        className="bg-indigo-600 h-2 rounded transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;