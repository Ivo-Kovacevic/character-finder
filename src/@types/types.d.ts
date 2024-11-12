export type ClickPositionType = {
  x: number;
  y: number;
};

export type CharacterPositionType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type CharactersPositionType = Record<string, CharacterPositionType>;

export type ImageSizeType = {
  height: number;
  width: number;
};
