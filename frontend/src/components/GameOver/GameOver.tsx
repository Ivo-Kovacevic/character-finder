import { useGameContext } from "../../context/gameContext";
import Leaderboard from "./Leaderboard";
import SaveResult from "./SaveResult";

export default function GameOver() {
  const { leaderboard, setLeaderboard, setGameStatus } = useGameContext();

  const replayGame = () => {
    setLeaderboard([]);
    setGameStatus("not-started");
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
        <div className="text-white border-2 border-lime-600 rounded p-4">
          {leaderboard.length > 0 ? <Leaderboard /> : <SaveResult />}

          <button
            onClick={replayGame}
            className="w-full border-2 rounded text-lime-600 border-lime-600 hover:border-lime-400 hover:text-lime-400"
          >
            Replay
          </button>
        </div>
      </div>
    </>
  );
}
