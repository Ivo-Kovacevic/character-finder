import { useState } from "react";
import { LeaderboardType } from "../@types/types";
import { useGameContext } from "../context/gameContext";
import { useCharacterContext } from "../context/characterContext";
import { getRandomThreeCharacters } from "../utils/characterUtils";

export default function End() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  const { setCharactersToFind } = useCharacterContext();
  const { clickPositions, time, username, setUsername, setGameStatus, setTime, setClickPositions } =
    useGameContext();

  const saveResult = async () => {
    try {
      const response = await fetch("http://localhost:3000/end", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clickPositions, time, username }),
      });
      if (!response.ok) {
        return;
      }
      getLeaderboard();
    } catch (error) {
      console.error("Error saving result");
    }
  };

  const getLeaderboard = async () => {
    try {
      const response = await fetch("http://localhost:3000/leaderboard", {
        method: "get",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        return;
      }
      const data: LeaderboardType[] = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error retrieving leaderboard");
    }
  };

  const replayGame = () => {
    setGameStatus("not-started");
    setTime(0);
    setClickPositions([]);
    setCharactersToFind(getRandomThreeCharacters());
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
        {leaderboard.length > 0 ? (
          <div className="text-white border-2 border-lime-600 rounded p-4">
            <h1 className="text-center text-4xl">LEADERBOARD</h1>
            {leaderboard.map((record, index) => (
              <div className="flex justify-between" key={`${record.username}-${index}-leaderboard`}>
                <span>{index + 1}</span>
                <span className="px-4">{record.username}</span>
                <span>{record.time}</span>
              </div>
            ))}
            <button
              onClick={replayGame}
              className="w-full bg-lime-600 rounded mt-4 hover:bg-lime-800"
            >
              Play again
            </button>
          </div>
        ) : (
          <div className="text-white border-2 border-lime-600 rounded p-4">
            <h1>Do you want to save result?</h1>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                saveResult();
              }}
            >
              <input
                className="w-full p-1 bg-transparent rounded border-2 border-lime-600 focus:outline-white"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <button className="w-full bg-lime-600 rounded my-2 hover:bg-lime-800">Save</button>
            </form>
            <button
              onClick={getLeaderboard}
              className="w-full border-2 rounded text-lime-600 border-lime-600 hover:border-lime-400 hover:text-lime-400"
            >
              I just want to see leaderboard
            </button>
          </div>
        )}
      </div>
    </>
  );
}
