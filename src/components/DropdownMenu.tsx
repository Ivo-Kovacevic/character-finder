import { CharacterPositionType, CharactersPositionType } from "../@types/types";

type DropdownMenuType = {
  dropdownOpen: boolean;
  clickPosition: {
    x: number;
    y: number;
  };
  charactersToFind: CharactersPositionType;
  foundCharacters: CharactersPositionType;
  setPickedCharacter: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function DropdownMenu({
  dropdownOpen,
  clickPosition,
  charactersToFind,
  foundCharacters,
  setPickedCharacter,
}: DropdownMenuType) {
  return (
    <>
      {dropdownOpen && (
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
    </>
  );
}
