export default function CharacterImage({ characterName }: { characterName: string }) {
  const url = import.meta.env.VITE_CHARACTER_IMAGE_URL;
  
  return (
    <img
      className="shadow shadow-black border-4 border-lime-600 hover:scale-150 transition"
      height="64px"
      width="64px"
      src={`${url}/${characterName.split(" ").join("_")}`}
      alt={characterName}
    />
  );
}
