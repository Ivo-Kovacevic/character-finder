import React, { useEffect, useRef, useState } from "react";
import videoGameImage from "./images/video-game-legends.jpg";
import characterPositions from "./constants/positions";
import { characterSize, checkCharacterPosition, updateImageSize } from "./utils/utils";
import { CharacterPositionType } from "./@types/types";

export default function App() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);
  const [charactersToFind, setCharactersToFind] = useState<Record<
    string,
    CharacterPositionType
  > | null>(null);
  const [foundCharacters, setFoundCharacters] = useState<CharacterPositionType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageSize, setImageSize] = useState({ height: 1238, width: 2500 });

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const randomThreeCharacters = Object.keys(characterPositions)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const randomThreeCharactersPositions: Record<string, CharacterPositionType> = {};
    randomThreeCharacters.map(
      (name) => (randomThreeCharactersPositions[name] = characterPositions[name])
    );
    setCharactersToFind(randomThreeCharactersPositions);

    window.addEventListener("resize", () => updateImageSize(imageRef, setImageSize));
    return window.removeEventListener("resize", () => updateImageSize(imageRef, setImageSize));
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const xPixels = e.clientX - rect.left;
    const yPixels = e.clientY - rect.top;
    const x = (xPixels / imageSize.width) * 100;
    const y = (yPixels / imageSize.height) * 100;

    console.log(x, y);

    checkCharacterPosition({ x, y }, setClickedCharacter);
    setClickPosition({ x: xPixels, y: yPixels });
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    console.log(clickedCharacter);
  }, [clickedCharacter]);

  return (
    <>
      <div className="relative video-game-legends">
        <img
          ref={imageRef}
          onLoad={() => updateImageSize(imageRef, setImageSize)}
          className="video-game-legends"
          onClick={(e) => handleImageClick(e)}
          src={videoGameImage}
          alt="video-game-legends"
        />

        {charactersToFind && dropdownOpen && (
          <div
            className="absolute top-0 text-xl bg-cyan-500"
            style={{ top: `${clickPosition.y}px`, left: `${clickPosition.x}px` }}
          >
            {Object.keys(charactersToFind).map((characterName) => (
              <div className="p-4" key={characterName}>
                {characterName}
              </div>
            ))}
          </div>
        )}

        {/* {Object.keys(characterPositions).map((characterKey) => {
          const position = characterPositions[characterKey];
          const { top, left, height, width } = characterSize(position, imageSize);
          return (
            <div
              key={characterKey}
              className="absolute opacity-50 bg-white border-red-500 border-2"
              style={{
                top: `${top}px`,
                left: `${left}px`,
                height: `${height}px`,
                width: `${width}px`,
              }}
            />
          );
        })} */}
      </div>
    </>
  );
}

// const arthurPos = {
//   top: 250,
//   bottom: 530,
//   left: 740,
//   right: 800,
// };

// Height 792px
// Width 1599px

// Raw height 1238px
// Raw width 2500px
