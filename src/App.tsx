import { useEffect } from "react";
import videoGameImage from "./assets/images/video-game-legends.jpg";

export default function App() {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
  }, []);

  return (
    <>
      <img className="h-screen max-w-none" src={videoGameImage} alt="video-game-legends" />
    </>
  );
}

// Height 1238px
// Width 2500px
