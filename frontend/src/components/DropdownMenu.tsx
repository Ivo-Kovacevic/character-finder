import { useEffect, useState } from "react";
import { CharacterType, ClickPositionType } from "../@types/types";
import { useCharacterContext } from "../context/characterContext";
import { useGameContext } from "../context/gameContext";

export default function DropdownMenu() {
  const { charactersToFind, setCharactersToFind } = useCharacterContext();
  const { imageSize, clickPosition, dropdownOpen, setDropdownOpen, setGameStatus, setTime } = useGameContext();

  const checkCharacter = async (character: string) => {
    try {
      setDropdownOpen(!dropdownOpen);
      const response = await fetch("http://localhost:3000/check", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterName: character,
          clickPosition: {
            x: (clickPosition.x / imageSize.width) * 100,
            y: (clickPosition.y / imageSize.height) * 100,
          },
        }),
      });
      const { charactersToFind, elapsedTime }: { charactersToFind: string[]; elapsedTime: number | null } =
        await response.json();
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
