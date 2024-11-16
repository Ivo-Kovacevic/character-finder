import { CharacterType } from "../@types/types";
const characters: CharacterType[] = JSON.parse(import.meta.env.VITE_CHARACTER_POSITIONS);

export default characters;
