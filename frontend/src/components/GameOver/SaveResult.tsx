import { LeaderboardType } from "../../@types/types";
import apiCall from "../../api/api";
import { useGameContext } from "../../context/gameContext";

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
    <div className="text-white border-2 border-lime-600 rounded p-4">
      <h1 className="text-center">Do you want to save the result?</h1>
      <h2 className="text-center text-4xl">{time}</h2>
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
  );
}
