import { useEffect } from "react";
import videoGameImage from "./assets/images/video-game-legends.jpg";

export default function App() {
  useEffect(() => {}, []);

  return (
    <>
      <img className="video-game-legends" src={videoGameImage} alt="video-game-legends" />
    </>
  );
}

// Height 1238px
// Width 2500px
