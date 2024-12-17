import { ClickPositionType } from "../@types/express.js";
import { isBetween } from "../utils/number.js";
import prisma from "../models/prisma.js";

export const getCharacterByName = async (characterName: string) => {
  return prisma.character.findFirst({
    where: { name: characterName },
    include: { positions: true },
  });
};

export const checkPositionForCharacter = async (
  clickPosition: ClickPositionType,
  characterName: string
) => {
  const pickedCharacter = await getCharacterByName(characterName);

  if (!pickedCharacter) {
    return false;
  }

  return pickedCharacter.positions.some((position) => {
    return (
      isBetween(clickPosition.x, position.left, position.right) &&
      isBetween(clickPosition.y, position.top, position.bottom)
    );
  });
};
