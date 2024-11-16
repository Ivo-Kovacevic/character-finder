import { CharacterType, ClickPositionType } from "../@types/types";
import { useCharacterContext } from "../context/characterContext";

type DropdownMenuType = {
  dropdownOpen: boolean;
  clickPosition: ClickPositionType;
};

export default function DropdownMenu({ dropdownOpen, clickPosition }: DropdownMenuType) {
  const { charactersToFind, foundCharacters, setPickedCharacter } = useCharacterContext();

  return (
    <>
      {dropdownOpen && (
        <div
          className="absolute top-0 text-xl text-white shadow-xl shadow-black"
          style={{ top: `${clickPosition.y}px`, left: `${clickPosition.x}px` }}
        >
          {charactersToFind.map(
            (character, index) =>
              !foundCharacters.some((foundCharacter) => foundCharacter.name === character.name) && (
                <div
                  className="p-2 relative flex items-center bg-black/75 hover:cursor-pointer hover:bg-lime-700/90 transition z-20"
                  key={`${character.name}-${index}-dropdown`}
                  onClick={() => setPickedCharacter(character)}
                >
                  <img
                    height="64px"
                    width="64px"
                    src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.name
                      .split(" ")
                      .join("_")}`}
                    alt={character.name}
                  />
                  <h1 className="p-2">{character.name}</h1>
                </div>
              )
          )}
        </div>
      )}
    </>
  );
}
