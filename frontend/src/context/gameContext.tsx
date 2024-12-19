import { createContext, ReactNode, useContext, useState } from "react";
import { ClickPositionType, GameStatus } from "../@types/types";

type GameContextType = {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  clickPosition: ClickPositionType;
  setClickPosition: React.Dispatch<React.SetStateAction<ClickPositionType>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  imageSize: { height: number; width: number };
  setImageSize: React.Dispatch<React.SetStateAction<{ height: number; width: number }>>;
  dropdownOpen: boolean;
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [username, setUsername] = useState("Arthur");
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [imageSize, setImageSize] = useState({ height: 1238, width: 2500 });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <GameContext.Provider
      value={{
        gameStatus,
        setGameStatus,
        username,
        setUsername,
        clickPosition,
        setClickPosition,
        time,
        setTime,
        imageSize,
        setImageSize,
        dropdownOpen,
        setDropdownOpen
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("useGameContext must be used within an GameProvider");
  }
  return context;
};
