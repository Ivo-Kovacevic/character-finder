import { createContext, ReactNode, useContext, useState } from "react";

type CharacterContextType = {
  charactersToFind: string[];
  setCharactersToFind: React.Dispatch<React.SetStateAction<string[]>>;
  pickedCharacter: string | null;
  setPickedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
  pickedCorrect: boolean;
  setPickedCorrect: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [charactersToFind, setCharactersToFind] = useState<string[]>([]);
  const [pickedCharacter, setPickedCharacter] = useState<string | null>(null);
  const [pickedCorrect, setPickedCorrect] = useState(false);

  return (
    <CharacterContext.Provider value={{ charactersToFind, setCharactersToFind, pickedCharacter, setPickedCharacter, pickedCorrect, setPickedCorrect }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = useContext(CharacterContext);
  if (context === null) {
    throw new Error("useCharacterContext must be used within an CharacterProvider");
  }
  return context;
};
