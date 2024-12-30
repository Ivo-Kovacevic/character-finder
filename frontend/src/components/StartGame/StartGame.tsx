import { useEffect, useRef } from "react";
import apiCall from "../../api/api";
import { useCharacterContext } from "../../context/characterContext";
import { useGameContext } from "../../context/gameContext";
import CharacterImage from "../CharacterImage";

export default function StartGame() {
  const { charactersToFind, setCharactersToFind } = useCharacterContext();
  const { setGameStatus, setTime } = useGameContext();
  const isInitialized = useRef(false);

  useEffect(() => {
    setTime(0);
    const initGame = async () => {
      try {
        const response = await apiCall("init", "POST", {});
        if (!response.ok) {
          return;
        }

        const charactersToFind: string[] = await response.json();
        setCharactersToFind(charactersToFind);
      } catch (error) {
        console.error("Error connecting to server");
      }
    };
    if (!isInitialized.current) {
      isInitialized.current = true;
      initGame();
    }
  }, []);

  const startGame = async () => {
    try {
      const response = await apiCall("start", "POST", {});
      if (!response.ok) {
        return;
      }

      setGameStatus("play");
    } catch (error) {
      console.error("Error starting game.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
      <div className="text-white border-2 border-lime-600 rounded p-4">
        <h1 className="w-min mb-2 text-center text-4xl font-cyberpunk tracking-tighter leading-6 text-yellow-400 drop-shadow-[0_1.2px_1.2px_rgba(20,200,220,0.8)]">
          character finder
        </h1>

        <h2>Find these characters:</h2>
        {charactersToFind.map((characterName, index) => (
          <div className="my-4 flex items-center" key={`${characterName}-${index}-setup`}>
            <CharacterImage characterName={characterName} />
            <p className="p-2">{characterName}</p>
          </div>
        ))}
        <button
          className="text-center w-full bg-lime-700 rounded py-2 hover:bg-lime-900 focus:outline-white"
          onClick={startGame}
        >
          Start
        </button>
      </div>
    </div>
  );
}
