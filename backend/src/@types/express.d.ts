export type StartBody = CharacterType[];

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
