import characters from "../constants/positions";
import { isBetween } from "./numberUtils";
import { CharacterType, ClickPositionType, ImageSizeType, PositionType } from "../@types/types";

export const getRandomThreeCharacters = () => {
  return characters.sort(() => 0.5 - Math.random()).slice(0, 3);
};

export const checkCharacterPosition = (
  clickPosition: ClickPositionType,
  pickedCharacter: CharacterType
) => {
  return pickedCharacter.positions.some((position) => {
    return (
      isBetween(clickPosition.x, position.left, position.right) &&
      isBetween(clickPosition.y, position.top, position.bottom)
    );
  });
};

export const hitboxSize = (position: PositionType, imageSize: ImageSizeType) => {
  const top = (position.top / 100) * imageSize.height;
  const left = (position.left / 100) * imageSize.width;
  const height = ((100 - (position.top + (100 - position.bottom))) / 100) * imageSize.height;
  const width = ((100 - (position.left + (100 - position.right))) / 100) * imageSize.width;
  return { top, left, height, width };
};
