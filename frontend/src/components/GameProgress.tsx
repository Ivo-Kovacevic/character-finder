import { useEffect, useRef, useState } from "react";
import { useCharacterContext } from "../context/characterContext";
import { useGameContext } from "../context/gameContext";
import { milliseconds, minutes, seconds } from "../utils/numberUtils";

export default function GameProgress() {
  const { charactersToFind, pickedCharacter, setPickedCharacter, pickedCorrect, setPickedCorrect } =
    useCharacterContext();
  const { time, setTime } = useGameContext();
  const [running, setRunning] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const timeoutDuration = 4000;

  // Timer
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      return () => clearInterval(interval);
    }
  }, [running]);

  // End game if all characters are found
  useEffect(() => {
    if (charactersToFind.length === 0) {
      setRunning(false);
    }
  }, [charactersToFind]);

  // Display info about picked character and remove after some time
  useEffect(() => {
    if (pickedCharacter) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAnimationKey((prev) => prev + 1);
      timeoutRef.current = setTimeout(() => setPickedCharacter(null), timeoutDuration);
    }
  }, [pickedCharacter]);

  return (
    <>
      {/* Character images at the top of the screen */}
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

      {/* Show info if picked character is correct or wrong */}
      {pickedCharacter && (
        <div className="fixed top-28 text-white text-2xl bg-black/85 ml-2">
          <p className="px-4">{pickedCorrect ? `You found ${pickedCharacter}` : `That is not ${pickedCharacter}`}</p>
          <div key={animationKey} className="h-2 bg-lime-600 animate-fill" />
        </div>
      )}

      {/* Timer at the bottom of screen */}
      <div className="fixed w-max flex text-white text-center p-1 mb-2 text-4xl bg-black/85 justify-center bottom-0 left-1/2 -translate-x-1/2 z-10">
        <span className="w-10 block">{minutes(time)}</span>
        <span>:</span>
        <span className="w-10 block">{seconds(time)}</span>
        <span>:</span>
        <span className="w-10 block">{milliseconds(time)}</span>
      </div>
    </>
  );
}
