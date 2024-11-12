import React, { useEffect, useRef, useState } from "react";
import videoGameImage from "./images/video-game-legends.jpg";
import characterPositions from "./constants/positions";
import { CharacterPositionType, CharactersPositionType } from "./@types/types";
import { updateImageSize } from "./utils/imageUtils";
import { checkCharacterPosition, getRandomThreeCharacters } from "./utils/characterUtils";

export default function App() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);
  const [charactersToFind, setCharactersToFind] = useState<CharactersPositionType>(
    getRandomThreeCharacters()
  );
  const [foundCharacters, setFoundCharacters] = useState<CharactersPositionType | null>(null);
  const [pickedCharacter, setPickedCharacter] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(true);
  const [imageSize, setImageSize] = useState({ height: 1238, width: 2500 });

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
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

    // checkCharacterPosition({ x, y }, setClickedCharacter);
    setClickPosition({ x: xPixels, y: yPixels });
    setDropdownOpen(!dropdownOpen);
  };

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
        console.log(`You picked correct character`);
        setCharactersToFind((prevCharactersToFind) => {
          const { [pickedCharacter]: _, ...remainingCharacters } = prevCharactersToFind;
          return remainingCharacters;
        });
      }
    }
  }, [pickedCharacter]);

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

        {charactersToFind && dropdownOpen && (
          <div
            className="absolute top-0 text-xl shadow-xl shadow-black"
            style={{ top: `${clickPosition.y}px`, left: `${clickPosition.x}px` }}
          >
            {Object.keys(charactersToFind).map((characterName) => (
              <div
                className="p-2 relative flex items-center bg-lime-600/30 backdrop-blur-sm hover:cursor-pointer hover:bg-lime-700/90 transition-all"
                key={characterName}
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
