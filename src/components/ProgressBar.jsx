const ProgressBar = ({ current, total, percentage }) => {
  const percent = percentage || (current / total) * 100;

  return (
    <div className="w-full">
      <div className="w-full bg-gray-300 h-3 rounded-full mt-2">
        <div
          className="bg-gradient-to-r from-indigo-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-sm text-gray-600">
        <span>Progress</span>
        <span>{Math.round(percent)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;