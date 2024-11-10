import React from "react";
import characterPositions from "../constants/positions";
import { CharacterPositionType, ClickPositionType, ImageSizeType } from "../@types/types";

export const isBetween = (value: number, min: number, max: number) => min < value && value < max;

export const checkCharacterPosition = (
  clickPosition: ClickPositionType,
  setClickedCharacter: React.Dispatch<React.SetStateAction<string | null>>
) => {
  for (const characterKey in characterPositions) {
    const { top, bottom, left, right } = characterPositions[characterKey];
    if (isBetween(clickPosition.x, left, right) && isBetween(clickPosition.y, top, bottom)) {
      setClickedCharacter(characterKey);
    }
  }
};

export const characterSize = (character: CharacterPositionType, imageSize: ImageSizeType) => {
  const top = (character.top / 100) * imageSize.height;
  const left = (character.left / 100) * imageSize.width;
  const height = ((100 - (character.top + (100 - character.bottom))) / 100) * imageSize.height;
  const width = ((100 - (character.left + (100 - character.right))) / 100) * imageSize.width;
  return { top, left, height, width };
};

export const updateImageSize = (
  imageRef: React.MutableRefObject<HTMLImageElement | null>,
  setImageSize: React.Dispatch<
    React.SetStateAction<{
      height: number;
      width: number;
    }>
  >
) => {
  if (imageRef.current) {
    const rect = imageRef.current.getBoundingClientRect();
    setImageSize({ height: rect.height, width: rect.width });
  }
};
