import { useCharacterContext } from "../context/characterContext";

export default function GameProgress() {
  const { charactersToFind, foundCharacters } = useCharacterContext();

  return (
    <>
      <div className="fixed w-full flex justify-center top-0 left-1/2 -translate-x-1/2">
        {charactersToFind.map((character, index) => (
          <div
            className="relative m-4 hover:scale-150 transition"
            key={`${character.name}-${index}-result`}
          >
            <img
              className={`shadow shadow-black border-4 rounded-2xl ${
                foundCharacters.some((foundCharacter) => foundCharacter.name === character.name)
                  ? "border-lime-600"
                  : "border-gray-500"
              }`}
              height="64px"
              width="64px"
              src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.name
                .split(" ")
                .join("_")}`}
              alt={character.name}
            />
            {foundCharacters.some((foundCharacter) => foundCharacter.name === character.name) && (
              <div className="absolute top-0 left-0 h-full w-full rounded-xl bg-lime-600/50" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
