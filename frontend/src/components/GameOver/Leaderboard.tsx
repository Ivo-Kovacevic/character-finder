import { useGameContext } from "../../context/gameContext";
import { milliseconds, minutes, seconds } from "../../utils/numberUtils";

export default function Leaderboard() {
  const { leaderboard } = useGameContext();

  return (
    <>
      <h1 className="text-center text-4xl">LEADERBOARD</h1>
      {leaderboard.map((record, index) => (
        <div className="flex justify-between" key={`${record.username}-${index}-leaderboard`}>
          <span>{index + 1}</span>
          <span className="px-4">{record.username}</span>
          <span>{`${minutes(record.time)}:${seconds(record.time)}:${milliseconds(record.time)}`}</span>
        </div>
      ))}
      {/* <button onClick={replayGame} className="w-full bg-lime-600 rounded mt-4 hover:bg-lime-800">
          Play again
      </button> */}
    </>
  );
}
