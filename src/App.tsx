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
import DropdownMenu from "./components/DropdownMenu";

export default function App() {
  const [gameReady, setGameReady] = useState(false);
  const [username, setUsername] = useState("");
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
    console.log(username);
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
        {!gameReady && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="text-white border-2 border-lime-600 bg-lime-900 rounded p-4">
              <h1 className="text-center text-2xl">Video Game Legends</h1>

              <form className="my-8" id="form" onSubmit={() => setGameReady(true)}>
                <label htmlFor="name">Username:</label>
                <br />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  className="name rounded text-black"
                  id="name"
                  required
                />
              </form>

              <h2>Find these characters:</h2>
              {Object.keys(charactersToFind).map((characterName) => (
                <div className="my-4 flex items-center" key={`${characterName}-setup`}>
                  <img
                    className="shadow shadow-black border-4 rounded-2xl"
                    height="64px"
                    width="64px"
                    src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${characterName
                      .split(" ")
                      .join("_")}`}
                    alt={characterName}
                  />
                  <p className="p-2">{characterName}</p>
                </div>
              ))}
              <button
                type="submit"
                form="form"
                className="text-center w-full bg-lime-700 rounded py-2 hover:bg-lime-800"
              >
                Start
              </button>
            </div>
          </div>
        )}

        <img
          ref={imageRef}
          onLoad={() => updateImageSize(imageRef, setImageSize)}
          className={`video-game-legends ${!gameReady && "blur-lg"}`}
          onClick={(e) => handleImageClick(e)}
          src={videoGameImage}
          alt="video-game-legends"
        />

        {/* Results */}
        {gameReady && charactersToFind && (
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

        {/* Dropdown menu for picking character */}
        {gameReady && (
          <DropdownMenu
            dropdownOpen={dropdownOpen}
            clickPosition={clickPosition}
            charactersToFind={charactersToFind}
            foundCharacters={foundCharacters}
            setPickedCharacter={setPickedCharacter}
          />
        )}

        {/* <CharacterHitboxes imageSize={imageSize} /> */}
      </div>
    </>
  );
}
