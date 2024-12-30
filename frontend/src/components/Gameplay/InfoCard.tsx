import { useEffect, useRef, useState } from "react";
import { useCharacterContext } from "../../context/characterContext";

export default function InfoCard() {
  const { pickedCharacter, setPickedCharacter, pickedCorrect } = useCharacterContext();
  const [animationKey, setAnimationKey] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const timeoutDuration = 4000;

  useEffect(() => {
    if (pickedCharacter) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setAnimationKey((prev) => prev + 1);
      timeoutRef.current = setTimeout(() => setPickedCharacter(null), timeoutDuration);
    }
  }, [pickedCharacter, pickedCorrect]);

  return (
    <>
      {pickedCharacter && (
        <div className="fixed top-28 text-white text-2xl bg-black/85 ml-2">
          <p className="px-4">{pickedCorrect ? `You found ${pickedCharacter}` : `That is not ${pickedCharacter}`}</p>
          <div key={animationKey} className="h-2 bg-lime-600 animate-fill" />
        </div>
      )}
    </>
  );
}
