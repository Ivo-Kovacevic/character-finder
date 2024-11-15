import characters from "../constants/positions";
import { hitboxSize } from "../utils/characterUtils";

type ImageSizeType = {
  imageSize: {
    height: number;
    width: number;
  };
};

export default function CharacterHitboxes({ imageSize }: ImageSizeType) {
  return (
    <>
      {characters.map((character) => {
        return character.positions.map((position, index) => {
          const { top, left, height, width } = hitboxSize(position, imageSize);
          return (
            <div
              key={`${character.name}-${index}-hitbox`}
              className="absolute opacity-50 bg-white border-red-500 border-2"
              style={{
                top: `${top}px`,
                left: `${left}px`,
                height: `${height}px`,
                width: `${width}px`,
              }}
            />
          );
        });
      })}
    </>
  );
}
