import { createContext, ReactNode, useContext, useState } from "react";
import { ClickPositionType, GameStatus } from "../@types/types";

type GameContextType = {
  gameStatus: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  clickPosition: ClickPositionType;
  setClickPosition: React.Dispatch<React.SetStateAction<ClickPositionType>>;
  clickPositions: ClickPositionType[];
  setClickPositions: React.Dispatch<React.SetStateAction<ClickPositionType[]>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");
  const [username, setUsername] = useState("Arthur");
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clickPositions, setClickPositions] = useState<ClickPositionType[]>([]);
  const [time, setTime] = useState(0);

  return (
    <GameContext.Provider
      value={{
        gameStatus,
        setGameStatus,
        username,
        setUsername,
        clickPosition,
        setClickPosition,
        clickPositions,
        setClickPositions,
        time,
        setTime,
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
