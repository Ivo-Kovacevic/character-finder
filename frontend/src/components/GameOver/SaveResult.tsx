import { LeaderboardType } from "../../@types/types";
import apiCall from "../../api/api";
import { useGameContext } from "../../context/gameContext";
import { milliseconds, minutes, seconds } from "../../utils/numberUtils";

export default function SaveResult() {
  const { username, setUsername, setLeaderboard, time } = useGameContext();

  const saveResult = async () => {
    try {
      const response = await apiCall("end", "POST", { username });
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
      const response = await apiCall("leaderboard", "GET", {});
      if (!response.ok) {
        return;
      }

      const data: LeaderboardType[] = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error retrieving leaderboard");
    }
  };

  return (
    <>
      <h1 className="text-center">Do you want to save the result?</h1>
      <h2 className="text-center text-4xl">{minutes(time)}:{seconds(time)}:{milliseconds(time)}</h2>
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
          maxLength={20}
        />
        <button className="w-full bg-lime-600 rounded mt-2 hover:bg-lime-800">Save</button>
      </form>
      <button
        onClick={getLeaderboard}
        className="w-full border-2 my-2 rounded text-lime-600 border-lime-600 hover:border-lime-400 hover:text-lime-400"
      >
        See leaderboard
      </button>
    </>
  );
}
