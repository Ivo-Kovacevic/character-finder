export type ClickPositionType = {
  x: number;
  y: number;
};

export type ImageSizeType = {
  height: number;
  width: number;
};

export type LeaderboardType = {
  id: number;
  username: string;
  time: number;
};

export type GameStatus = "not-started" | "running" | "finished";

export type Methods = "GET" | "POST";

export type Endpoints = "init" | "start" | "check" | "end" | "leaderboard";