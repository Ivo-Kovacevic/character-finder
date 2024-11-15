import { useCharacterContext } from "../context/characterContext";

type GameSetupType = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setGameReady: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GameSetup({ setUsername, setGameReady }: GameSetupType) {
  const { charactersToFind } = useCharacterContext();

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/75">
        <div className="text-white border-2 border-lime-600 rounded p-4">
          <h1 className="text-center text-4xl">Video Game Legends</h1>

          <form className="my-8" id="form" onSubmit={() => setGameReady(true)}>
            <label htmlFor="name">Username:</label>
            <br />
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="name rounded w-full bg-lime-600/20 border-2 border-lime-600 focus:outline-white"
              id="name"
              required
            />
          </form>

          <h2>Find these characters:</h2>
          {charactersToFind.map((character, index) => (
            <div className="my-4 flex items-center" key={`${character.name}-${index}-setup`}>
              <img
                className="shadow shadow-black border-4 rounded-2xl hover:scale-150 transition"
                height="64px"
                width="64px"
                src={`https://res.cloudinary.com/dqbe0apqn/image/upload/${character.name
                  .split(" ")
                  .join("_")}`}
                alt={character.name}
              />
              <p className="p-2">{character.name}</p>
            </div>
          ))}
          <button
            type="submit"
            form="form"
            className="text-center w-full bg-lime-700 rounded py-2 hover:bg-lime-900 focus:outline-white"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}
