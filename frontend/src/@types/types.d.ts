export type ClickPositionType = {
  x: number;
  y: number;
};

export type CharacterType = {
  name: string;
  positions: PositionType[];
};

export type PositionType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ImageSizeType = {
  height: number;
  width: number;
};

export type GameStatus = "not-started" | "running" | "finished";

export type LeaderboardType = {
  id: number;
  username: string;
  time: number;
};
