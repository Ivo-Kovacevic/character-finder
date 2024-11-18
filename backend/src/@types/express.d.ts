export type StartBody = CharacterType[];

export type EndBody = {
  username: string;
  time: number;
  clickPositions: ClickPositionType[];
};

export type ClickPositionType = {
  x: number;
  y: number;
}

export type CharacterType = {
  name: string;
  positions: PositionType[];
}

export type PositionType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
