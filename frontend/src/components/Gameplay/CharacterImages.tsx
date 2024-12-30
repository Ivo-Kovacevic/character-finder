import { useCharacterContext } from "../../context/characterContext";

export default function CharacterImages() {
  const { charactersToFind } = useCharacterContext();

  return (
    <div className="fixed w-max flex justify-center top-0 left-1/2 -translate-x-1/2 z-10">
      {charactersToFind.map((character, index) => (
        <div
          className={`relative hover:scale-150 transition mt-4 ${index === 1 && "mx-4"}`}
          key={`${character}-${index}-result`}
        >
          <img
            className="shadow shadow-black border-4 rounded-2xl border-gray-500"
            height="64px"
            width="64px"
            src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.split(" ").join("_")}`}
            alt={character}
          />
        </div>
      ))}
    </div>
  );
}
