import { useEffect, useState } from "react";

const Timer = ({ onTimeUp, index, resetTrigger, questionTime = 30 }) => {
  const [time, setTime] = useState(questionTime);

  // Reset timer when question changes or reset trigger is activated
  useEffect(() => {
    setTime(questionTime);
  }, [index, resetTrigger, questionTime]);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, onTimeUp]);

  const getTimerColor = () => {
    if (time <= 5) return "text-red-600 font-bold";
    if (time <= 10) return "text-orange-600 font-semibold";
    return "text-gray-700 font-medium";
  };

  const getProgressWidth = () => {
    return (time / questionTime) * 100;
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">Question Timer</span>
        <span className={`text-lg ${getTimerColor()}`}>
          ⏱ {time}s
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            time <= 5 ? "bg-red-500" : 
            time <= 10 ? "bg-orange-500" : "bg-blue-500"
          }`}
          style={{ width: `${getProgressWidth()}%` }}
        />
      </div>
      
      {time <= 10 && (
        <p className="text-xs text-red-600 mt-1 animate-pulse">
          {time <= 5 ? "Hurry up! Time running out!" : "Time running low!"}
        </p>
      )}
    </div>
  );
};

export default Timer;
