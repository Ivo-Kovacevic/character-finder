import React, { MouseEvent, useEffect, useState } from "react";
import videoGameImage from "../public/images/video-game-legends.jpg";

export default function App() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setClickPosition({ x, y });
  };

  useEffect(() => {
    console.log(clickPosition);
  }, [clickPosition]);

  return (
    <>
      <img
        className="video-game-legends"
        onClick={(e) => handleImageClick(e)}
        src={videoGameImage}
        alt="video-game-legends"
      />
    </>
  );
}

// Height 1238px
// Width 2500px
