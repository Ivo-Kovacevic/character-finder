import { useEffect, useState } from "react";
import { LeaderboardType } from "../@types/types";

export default function End() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardType[]>([]);
  useEffect(() => {
    const getLeaderboard = async () => {
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
    };
    getLeaderboard();
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
        <div className="text-white border-2 border-lime-600 rounded p-4">
          <h1 className="text-center text-4xl">LEADERBOARD</h1>
          {leaderboard.map((record, index) => (
            <div className="flex justify-between" key={`${record.username}-${index}-leaderboard`}>
              <span>{index + 1}</span>
              <span className="px-4">{record.username}</span>
              <span>{record.time}</span>
            </div>
          ))}
        </div>
        <div className="text-white border-2 border-lime-600 rounded p-4">Test</div>
      </div>
    </>
  );
}
