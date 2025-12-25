import { useEffect, useState } from "react";

const Timer = ({ onTimeUp, index }) => {
  const [time, setTime] = useState(30);

  useEffect(() => {
    setTime(30);
  }, [index]);

  useEffect(() => {
    if (time === 0) {
      onTimeUp();
      return;
    }
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  return <p className="text-right font-medium">⏱ {time}s</p>;
};

export default Timer;