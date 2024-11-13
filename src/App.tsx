import React, { useEffect, useRef, useState } from "react";
import videoGameImage from "./images/video-game-legends.jpg";
import characterPositions from "./constants/positions";
import { CharacterPositionType, CharactersPositionType } from "./@types/types";
import { updateImageSize } from "./utils/imageUtils";
import {
  characterSize,
  checkCharacterPosition,
  getRandomThreeCharacters,
} from "./utils/characterUtils";
import CharacterHitboxes from "./components/CharacterHitboxes";

export default function App() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [charactersToFind, setCharactersToFind] = useState<CharactersPositionType>(
    getRandomThreeCharacters()
  );
  const [foundCharacters, setFoundCharacters] = useState<CharactersPositionType>({});
  const [pickedCharacter, setPickedCharacter] = useState<string | null>(null);
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
        setFoundCharacters((prevFoundCharacters) => {
          return { [pickedCharacter]: characterPositions[pickedCharacter], ...prevFoundCharacters };
        });
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
      <div className="relative video-game-legends w-max">
        <img
          ref={imageRef}
          onLoad={() => updateImageSize(imageRef, setImageSize)}
          className="video-game-legends"
          onClick={(e) => handleImageClick(e)}
          src={videoGameImage}
          alt="video-game-legends"
        />

        {/* Results */}
        {charactersToFind && (
          <div className="fixed w-full flex justify-center top-0 left-1/2 -translate-x-1/2">
            {Object.keys(charactersToFind).map((characterName) => (
              <div className="relative m-4 hover:scale-150 transition" key={characterName}>
                <img
                  className={`shadow shadow-black border-4 rounded-2xl ${
                    characterName in foundCharacters ? "border-lime-600" : "border-gray-500"
                  }`}
                  height="64px"
                  width="64px"
                  src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${characterName
                    .split(" ")
                    .join("_")}`}
                  alt={characterName}
                />
                {characterName in foundCharacters && (
                  <div className="absolute top-0 left-0 h-full w-full rounded-xl bg-lime-600/50" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Dropdown menu */}
        {charactersToFind && dropdownOpen && (
          <div
            className="absolute top-0 text-xl shadow-xl shadow-black"
            style={{ top: `${clickPosition.y}px`, left: `${clickPosition.x}px` }}
          >
            {Object.keys(charactersToFind).map(
              (characterName) =>
                !(characterName in foundCharacters) && (
                  <div
                    className="p-2 relative flex items-center bg-lime-600/30 backdrop-blur-sm hover:cursor-pointer hover:bg-lime-700/90 transition-all"
                    key={`${characterName} - dropdown`}
                    onClick={() => setPickedCharacter(characterName)}
                  >
                    <img
                      height="64px"
                      width="64px"
                      src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${characterName
                        .split(" ")
                        .join("_")}`}
                      alt={characterName}
                    />
                    <h1 className="p-2">{characterName}</h1>
                  </div>
                )
            )}
          </div>
        )}

        {/* <CharacterHitboxes imageSize={imageSize} /> */}
      </div>
    </>
  );
}
