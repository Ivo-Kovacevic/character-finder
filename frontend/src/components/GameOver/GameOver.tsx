import { useGameContext } from "../../context/gameContext";
import Leaderboard from "./Leaderboard";
import SaveResult from "./SaveResult";

export default function GameOver() {
    const { leaderboard } = useGameContext();

  // const replayGame = () => {
  //   setGameStatus("not-started");
  //   setTime(0);
  //   setClickPositions([]);
  //   setCharactersToFind(getRandomThreeCharacters());
  // };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
        {leaderboard.length > 0 ? (
          <Leaderboard />
        ) : (
          <SaveResult />
        )}
      </div>
    </>
  );
}
