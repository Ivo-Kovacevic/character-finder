import { createContext, ReactNode, useContext, useState } from "react";
import { CharacterType } from "../@types/types";
import { getRandomThreeCharacters } from "../utils/characterUtils";

type CharacterContextType = {
  charactersToFind: string[];
  setCharactersToFind: React.Dispatch<React.SetStateAction<string[]>>;
  foundCharacters: CharacterType[];
  setFoundCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>;
  pickedCharacter: string | null;
  setPickedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [charactersToFind, setCharactersToFind] = useState<string[]>([]);
  const [foundCharacters, setFoundCharacters] = useState<CharacterType[]>([]);
  const [pickedCharacter, setPickedCharacter] = useState<string | null>(null);

  return (
    <CharacterContext.Provider
      value={{
        charactersToFind,
        setCharactersToFind,
        foundCharacters,
        setFoundCharacters,
        pickedCharacter,
        setPickedCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (context === null) {
    throw new Error("usePostsContext must be used within an CharacterProvider");
  }
  return context;
};
