import { CharacterPositionType, ClickPositionType, ImageSizeType } from "../@types/types";
import characterPositions from "../constants/positions";
import { isBetween } from "./numberUtils";

export const getRandomThreeCharacters = () => {
  const randomThreeCharacters = Object.keys(characterPositions)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  const randomThreeCharactersPositions: Record<string, CharacterPositionType> = {};
  randomThreeCharacters.map(
    (name) => (randomThreeCharactersPositions[name] = characterPositions[name])
  );
  return randomThreeCharactersPositions;
};

export const checkCharacterPosition = (
  clickPosition: ClickPositionType,
  pickedCharacter: string
) => {
  if (
    isBetween(
      clickPosition.x,
      characterPositions[pickedCharacter].left,
      characterPositions[pickedCharacter].right
    ) &&
    isBetween(
      clickPosition.y,
      characterPositions[pickedCharacter].top,
      characterPositions[pickedCharacter].bottom
    )
  ) {
    return true;
  }
};

export const characterSize = (character: CharacterPositionType, imageSize: ImageSizeType) => {
  const top = (character.top / 100) * imageSize.height;
  const left = (character.left / 100) * imageSize.width;
  const height = ((100 - (character.top + (100 - character.bottom))) / 100) * imageSize.height;
  const width = ((100 - (character.left + (100 - character.right))) / 100) * imageSize.width;
  return { top, left, height, width };
};
