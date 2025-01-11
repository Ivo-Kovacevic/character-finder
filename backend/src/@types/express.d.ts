export type CheckBody = {
  characterName: string;
  clickPosition: ClickPositionType;
}

export type EndBody = {
  username: string;
};

export type ClickPositionType = {
  x: number;
  y: number;
}

export type PositionType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
