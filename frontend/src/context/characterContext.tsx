import { createContext, ReactNode, useContext, useState } from "react";

type CharacterContextType = {
  charactersToFind: string[];
  setCharactersToFind: React.Dispatch<React.SetStateAction<string[]>>;
  pickedCharacter: string | null;
  setPickedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CharacterContext = createContext<CharacterContextType | null>(null);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [charactersToFind, setCharactersToFind] = useState<string[]>([]);
  const [pickedCharacter, setPickedCharacter] = useState<string | null>(null);

  return (
    <CharacterContext.Provider value={{ charactersToFind, setCharactersToFind, pickedCharacter, setPickedCharacter }}>
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
