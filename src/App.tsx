import React, { useEffect, useRef, useState } from "react";
import videoGameImage from "./images/video-game-legends.jpg";
import { CharacterType } from "./@types/types";
import { updateImageSize } from "./utils/imageUtils";
import { checkCharacterPosition, getRandomThreeCharacters } from "./utils/characterUtils";
import CharacterHitboxes from "./components/CharacterHitboxes";
import DropdownMenu from "./components/DropdownMenu";
import characters from "./constants/positions";
import { useCharacterContext } from "./context/characterContext";
import GameSetup from "./components/GameSetup";
import GameProgress from "./components/GameProgress";

export default function App() {
  const {
    charactersToFind,
    setCharactersToFind,
    foundCharacters,
    setFoundCharacters,
    pickedCharacter,
    setPickedCharacter,
  } = useCharacterContext();

  const [gameReady, setGameReady] = useState(false);
  const [username, setUsername] = useState("");
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
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
      }
      setPickedCharacter(null);
      setDropdownOpen(false);
    }
  }, [pickedCharacter]);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickPosition({ x, y });
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="relative w-max font-jersey">
        <img
          ref={imageRef}
          onLoad={() => updateImageSize(imageRef, setImageSize)}
          className={`video-game-legends ${!gameReady && "blur-sm"}`}
          onClick={(e) => handleImageClick(e)}
          src={videoGameImage}
          alt="video-game-legends"
        />

        {!gameReady ? (
          <GameSetup setUsername={setUsername} setGameReady={setGameReady} />
        ) : (
          <>
            <GameProgress />
            <DropdownMenu dropdownOpen={dropdownOpen} clickPosition={clickPosition} />
          </>
        )}

        <CharacterHitboxes imageSize={imageSize} />
      </div>
    </>
  );
}
