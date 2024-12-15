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
  const {
    charactersToFind,
    setCharactersToFind,
    foundCharacters,
    setFoundCharacters,
    pickedCharacter,
    setPickedCharacter,
  } = useCharacterContext();

  const {
    gameStatus,
    setGameStatus,
    clickPosition,
    setClickPosition,
    clickPositions,
    setClickPositions,
  } = useGameContext();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageSize, setImageSize] = useState({ height: 1238, width: 2500 });

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    window.addEventListener("resize", () => updateImageSize(imageRef, setImageSize));
    return window.removeEventListener("resize", () => updateImageSize(imageRef, setImageSize));
  }, []);

  useEffect(() => {
    if (pickedCharacter) {
      if (
        checkCharacterPosition(
          {
            x: (clickPosition.x / imageSize.width) * 100,
            y: (clickPosition.y / imageSize.height) * 100,
          },
          pickedCharacter
        )
      ) {
        setFoundCharacters((prevFoundCharacters) => [pickedCharacter, ...prevFoundCharacters]);
        setClickPositions((prevClickPositions) => [
          {
            x: (clickPosition.x / imageSize.width) * 100,
            y: (clickPosition.y / imageSize.height) * 100,
          },
          ...prevClickPositions,
        ]);
      }
      setPickedCharacter(null);
      setDropdownOpen(false);
    }
  }, [pickedCharacter]);

  useEffect(() => {
    if (charactersToFind.length === foundCharacters.length) {
      setGameStatus("finished");
    }
  }, [foundCharacters]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickPosition({ x, y });
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
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
            <GameSetup setGameStatus={setGameStatus} />
          </>
        ) : gameStatus === "running" ? (
          <>
            <GameProgress />
            <DropdownMenu dropdownOpen={dropdownOpen} clickPosition={clickPosition} />
          </>
        ) : (
          <>
            <End />
          </>
        )}

        {/* <CharacterHitboxes imageSize={imageSize} /> */}
      </div>
    </>
  );
}
