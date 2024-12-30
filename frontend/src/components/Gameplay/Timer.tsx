import { useEffect, useState } from "react";
import { useGameContext } from "../../context/gameContext";
import { milliseconds, minutes, seconds } from "../../utils/numberUtils";

export default function Timer() {
  const { time, setTime } = useGameContext();
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [running]);

  return (
    <div className="fixed w-max flex text-white text-center p-1 mb-2 text-4xl bg-black/85 justify-center bottom-0 left-1/2 -translate-x-1/2 z-10">
      <span className="w-10 block">{minutes(time)}</span>
      <span>:</span>
      <span className="w-10 block">{seconds(time)}</span>
      <span>:</span>
      <span className="w-10 block">{milliseconds(time)}</span>
    </div>
  );
}
