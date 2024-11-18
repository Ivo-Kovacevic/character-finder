export type ClickPositionType = {
  x: number;
  y: number;
};

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

export type ImageSizeType = {
  height: number;
  width: number;
};
