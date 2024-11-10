import { CharacterPositionType } from "./types";

interface ImportMetaEnv {
  readonly VITE_CHARACTER_POSITIONS: Record<string, CharacterPositionType>;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
