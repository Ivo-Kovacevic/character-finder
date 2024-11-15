import { createContext, ReactNode, useContext, useState } from "react";
import { CharacterType } from "../@types/types";
import { getRandomThreeCharacters } from "../utils/characterUtils";

type CharacterContextType = {
  charactersToFind: CharacterType[];
  setCharactersToFind: React.Dispatch<React.SetStateAction<CharacterType[]>>;
  foundCharacters: CharacterType[];
  setFoundCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>;
  pickedCharacter: CharacterType | null;
  setPickedCharacter: React.Dispatch<React.SetStateAction<CharacterType | null>>;
};

export const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [charactersToFind, setCharactersToFind] = useState<CharacterType[]>(
    getRandomThreeCharacters()
  );
  const [foundCharacters, setFoundCharacters] = useState<CharacterType[]>([]);
  const [pickedCharacter, setPickedCharacter] = useState<CharacterType | null>(null);

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
