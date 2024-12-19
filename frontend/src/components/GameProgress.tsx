import { useEffect, useState } from "react";
import { useCharacterContext } from "../context/characterContext";
import { useGameContext } from "../context/gameContext";

export default function GameProgress() {
  const { charactersToFind, foundCharacters } = useCharacterContext();
  const { time, setTime } = useGameContext();
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    if (charactersToFind.length === 0) {
      setRunning(false);
    }
  }, [foundCharacters]);

  const minutes = Math.floor(time / (1000 * 60));
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <>
      {/* Results */}
      <div className="fixed w-max flex justify-center top-0 left-1/2 -translate-x-1/2 z-10">
        {charactersToFind.map((character, index) => (
          <div
            className={`relative hover:scale-150 transition mt-4 ${index === 1 && "mx-4"}`}
            key={`${character}-${index}-result`}
          >
            <img
              className={`shadow shadow-black border-4 rounded-2xl ${
                foundCharacters.some((foundCharacter) => foundCharacter.name === character)
                  ? "border-lime-600"
                  : "border-gray-500"
              }`}
              height="64px"
              width="64px"
              src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.split(" ").join("_")}`}
              alt={character}
            />
            {foundCharacters.some((foundCharacter) => foundCharacter.name === character) && (
              <div className="absolute top-0 left-0 h-full w-full rounded-xl bg-lime-600/50" />
            )}
          </div>
        ))}
      </div>

      {/* Timer */}
      <div className="fixed w-max flex text-white text-center p-1 mb-2 text-4xl bg-black/75 justify-center bottom-0 left-1/2 -translate-x-1/2 z-10">
        <span className="w-10 block">{minutes.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span className="w-10 block">{seconds.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span className="w-10 block">{milliseconds.toString().padStart(2, "0")}</span>
      </div>
    </>
  );
}
