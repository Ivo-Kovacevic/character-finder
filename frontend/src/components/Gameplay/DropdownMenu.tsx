import { useEffect, useRef } from "react";
import { useCharacterContext } from "../../context/characterContext";
import { useGameContext } from "../../context/gameContext";
import apiCall from "../../api/api";
import { pixelsToPercentage } from "../../utils/clickUtils";

export default function DropdownMenu() {
  const { charactersToFind, setCharactersToFind, setPickedCharacter, setPickedCorrect } = useCharacterContext();
  const { imageSize, clickPosition, dropdownOpen, setDropdownOpen, setGameStatus } = useGameContext();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

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
      setPickedCharacter(character);
      if (!response.ok) {
        setPickedCorrect(false);
        return;
      }

      const { charactersToFind }: { charactersToFind: string[] } = await response.json();
      setPickedCorrect(true);
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

  // Move dropdown inwards if click is near right or bottom border
  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const adjustedX = Math.min(clickPosition.x, imageSize.width - dropdownRect.width);
      const adjustedY = Math.min(clickPosition.y, imageSize.height - dropdownRect.height);

      dropdownRef.current.style.left = `${adjustedX}px`;
      dropdownRef.current.style.top = `${adjustedY}px`;
    }
  }, [dropdownOpen, imageSize]);

  return (
    <>
      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-0 text-xl w-max text-white shadow-xl shadow-black"
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
