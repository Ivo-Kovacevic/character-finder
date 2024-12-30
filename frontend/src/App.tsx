import React, { useEffect, useRef } from "react";
import videoGameImage from "./images/video-game-legends.jpg";
import { updateImageSize } from "./utils/imageUtils";
import { useCharacterContext } from "./context/characterContext";
import { useGameContext } from "./context/gameContext";
import apiCall from "./api/api";
import StartGame from "./components/StartGame/StartGame";
import Gameplay from "./components/Gameplay/Gameplay";
import GameOver from "./components/GameOver/GameOver";

export default function App() {
  const { setCharactersToFind } = useCharacterContext();
  const { gameStatus, setClickPosition, setImageSize, dropdownOpen, setDropdownOpen } = useGameContext();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const initGame = async () => {
      try {
        const response = await apiCall("init", "POST", {});
        if (!response.ok) {
          return;
        }

        const charactersToFind: string[] = await response.json();
        setCharactersToFind(charactersToFind);
      } catch (error) {
        console.error("Error connecting to server");
      }
    };
    if (!isInitialized.current) {
      isInitialized.current = true;
      initGame();
    }

    window.addEventListener("resize", () => updateImageSize(imageRef, setImageSize));
    return window.removeEventListener("resize", () => updateImageSize(imageRef, setImageSize));
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickPosition({ x, y });
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="video-game-legends relative w-max font-jersey">
      <img
        ref={imageRef}
        onLoad={() => updateImageSize(imageRef, setImageSize)}
        className={`video-game-legends ${gameStatus !== "running" && "blur-sm"}`}
        onClick={(e) => handleImageClick(e)}
        src={videoGameImage}
        alt="video-game-legends"
      />

      {gameStatus === "not-started" ? (
        <StartGame />
      ) : gameStatus === "running" ? (
        <Gameplay />
      ) : (
        <GameOver />
      )}
    </div>
  );
}
