import apiCall from "../api/api";
import { useCharacterContext } from "../context/characterContext";
import { useGameContext } from "../context/gameContext";

export default function GameSetup() {
  const { charactersToFind } = useCharacterContext();
  const { setGameStatus } = useGameContext();

  const startGame = async () => {
    try {
      const response = await apiCall("start", "POST", {});
      if (!response.ok) {
        return;
      }

      setGameStatus("running");
    } catch (error) {
      console.error("Error starting game.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
        <div className="text-white border-2 border-lime-600 rounded p-4">
          <h1 className="text-center text-4xl">Video Game Legends</h1>

          <h2>Find these characters:</h2>
          {charactersToFind.map((character, index) => (
            <div className="my-4 flex items-center" key={`${character}-${index}-setup`}>
              <img
                className="shadow shadow-black border-4 rounded-2xl hover:scale-150 transition"
                height="64px"
                width="64px"
                src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.split(" ").join("_")}`}
                alt={character}
              />
              <p className="p-2">{character}</p>
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
    </>
  );
}
