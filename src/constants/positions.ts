import { CharacterPositionType } from "../@types/types";
const characterPositions: Record<string, CharacterPositionType> = JSON.parse(
  import.meta.env.VITE_CHARACTER_POSITIONS
);

export default characterPositions;
