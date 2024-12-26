import { useEffect, useState } from "react";
import { useCharacterContext } from "../context/characterContext";
import { useGameContext } from "../context/gameContext";
import apiCall from "../api/api";
import { pixelsToPercentage } from "../utils/clickUtils";

export default function DropdownMenu() {
  const { charactersToFind, setCharactersToFind } = useCharacterContext();
  const { imageSize, clickPosition, dropdownOpen, setDropdownOpen, setGameStatus, } = useGameContext();

  const checkCharacter = async (character: string) => {
    try {
      setDropdownOpen(!dropdownOpen);
      const response = await apiCall("check", "POST", {
        characterName: character,
        clickPosition: {
          x: pixelsToPercentage(clickPosition.x, imageSize.width),
          y: pixelsToPercentage(clickPosition.y, imageSize.height),
        },
      });
      if (!response.ok) {
        return;
      }

      const { charactersToFind }: { charactersToFind: string[] } = await response.json();
      setCharactersToFind(charactersToFind);
    } catch (error) {
      console.error("Error checking character position");
    }
  };

  useEffect(() => {
    if (charactersToFind.length === 0) {
      setGameStatus("finished");
    }
  }, [charactersToFind]);

  return (
    <>
      {dropdownOpen && (
        <div
          className="absolute top-0 text-xl text-white shadow-xl shadow-black"
          style={{ top: `${clickPosition.y}px`, left: `${clickPosition.x}px` }}
        >
          {charactersToFind.map((character, index) => (
            <div
              className="p-2 relative flex items-center bg-black/75 hover:cursor-pointer hover:bg-lime-700/90 transition z-20"
              key={`${character}-${index}-dropdown`}
              onClick={() => checkCharacter(character)}
            >
              <img
                height="64px"
                width="64px"
                src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.split(" ").join("_")}`}
                alt={character}
              />
              <h1 className="p-2">{character}</h1>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
