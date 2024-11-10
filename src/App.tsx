import React, { useEffect, useRef, useState } from "react";
import videoGameImage from "../public/images/video-game-legends.jpg";
import characterPositions from "./constants/positions";
import { checkCharacterPosition, updateImageSize } from "./utils/utils";

export default function App() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [clickedCharacter, setClickedCharacter] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ height: 1238, width: 2500 });
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    window.addEventListener("resize", () => updateImageSize(imageRef, setImageSize));
    return window.removeEventListener("resize", () => updateImageSize(imageRef, setImageSize));
  }, []);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / imageSize.width) * 100;
    const y = ((e.clientY - rect.top) / imageSize.height) * 100;

    checkCharacterPosition({ x, y }, setClickedCharacter);
    console.log({
      x: x.toFixed(2),
      y: y.toFixed(2),
    });
    setClickPosition({ x, y });
  };

  useEffect(() => {
    console.log(clickedCharacter);
  }, [clickedCharacter]);

  return (
    <>
      <div className="relative video-game-legends">
        <img
          ref={imageRef}
          onLoad={() => updateImageSize(imageRef, setImageSize)}
          className="video-game-legends"
          onClick={(e) => handleImageClick(e)}
          src={videoGameImage}
          alt="video-game-legends"
        />

        {/* {Object.keys(characterPositions).map((characterKey) => {
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
        })} */}
      </div>
    </>
  );
}

// const arthurPos = {
//   top: 250,
//   bottom: 530,
//   left: 740,
//   right: 800,
// };

// Height 792px
// Width 1599px

// Raw height 1238px
// Raw width 2500px
