import { CharacterType, ClickPositionType } from "../@types/express.js";
import { isBetween } from "./number.js";

export const checkPositions = (clickPositions: ClickPositionType[], charactersToFind: CharacterType[]) => {
  return clickPositions.every((clickPosition) => {
    return charactersToFind.some((character) => {
      return character.positions.some((position) => {
        return (
          isBetween(clickPosition.x, position.left, position.right) &&
          isBetween(clickPosition.y, position.top, position.bottom)
        );
      });
    });
  });
};
