import { ClickPositionType } from "../@types/express.js";
import { isBetween } from "../utils/number.js";
import prisma from "../models/prisma.js";

export const getCharacterByName = (characterName: string) => {
  return prisma.character.findFirst({
    where: { name: characterName },
    include: { positions: true },
  });
};

export const checkPositionForCharacter = async (clickPosition: ClickPositionType, characterName: string) => {
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

export const getRandomCharacters = async (num: number) => {
  const randomCharacters: { name: string }[] = await prisma.$queryRaw`
    SELECT * FROM "Character"
    ORDER BY RANDOM()
    LIMIT ${num};
  `;
  return randomCharacters;
};
