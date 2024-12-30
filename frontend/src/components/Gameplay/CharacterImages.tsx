import { useCharacterContext } from "../../context/characterContext";
import CharacterImage from "../CharacterImage";

export default function CharacterImages() {
  const { charactersToFind } = useCharacterContext();

  return (
    <div className="fixed flex justify-center gap-4 top-0 mt-4 left-1/2 -translate-x-1/2 z-10">
      {charactersToFind.map((characterName, index) => (
        <CharacterImage key={`${characterName}-${index}-result`} characterName={characterName} />
      ))}
    </div>
  );
}
