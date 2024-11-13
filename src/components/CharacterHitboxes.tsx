import characterPositions from "../constants/positions";
import { characterSize } from "../utils/characterUtils";

type ImageSizeType = {
    imageSize: {
        height: number;
        width: number;
    }
}

export default function CharacterHitboxes({imageSize}: ImageSizeType) {
  return (
    <>
      {Object.keys(characterPositions).map((characterKey) => {
          const position = characterPositions[characterKey];
          const { top, left, height, width } = characterSize(position, imageSize);
          return (
            <div
              key={characterKey}
              className="absolute opacity-50 bg-white border-red-500 border-2"
              style={{
                top: `${top}px`,
                left: `${left}px`,
                height: `${height}px`,
                width: `${width}px`,
              }}
            />
          );
        })}
    </>
  );
}