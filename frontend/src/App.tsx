import React, { useEffect, useRef, useState } from "react";
import videoGameImage from "./images/video-game-legends.jpg";
import { CharacterType, ClickPositionType, GameStatus } from "./@types/types";
import { updateImageSize } from "./utils/imageUtils";
import { checkCharacterPosition, getRandomThreeCharacters } from "./utils/characterUtils";
import CharacterHitboxes from "./components/CharacterHitboxes";
import characters from "./constants/positions";
import { useCharacterContext } from "./context/characterContext";
import { useGameContext } from "./context/gameContext";
import GameSetup from "./components/GameSetup";
import GameProgress from "./components/GameProgress";
import DropdownMenu from "./components/DropdownMenu";
import End from "./components/End";

export default function App() {
  const { setCharactersToFind } = useCharacterContext();
  const { gameStatus, setClickPosition, setImageSize, dropdownOpen, setDropdownOpen } = useGameContext();

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const initGame = async () => {
      try {
        const response = await fetch("http://localhost:3000/init", {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        const charactersToFind: string[] = await response.json();
        setCharactersToFind(charactersToFind);
      } catch (error) {
        console.error("Error connecting to server");
      }
    };
    initGame();

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
        <>
          <GameSetup />
        </>
      ) : gameStatus === "running" ? (
        <>
          <GameProgress />
          <DropdownMenu />
        </>
      ) : (
        <>
          <End />
        </>
      )}

      {/* <CharacterHitboxes imageSize={imageSize} /> */}
    </div>
  );
}
