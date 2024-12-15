import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/output.css";
import { CharacterProvider } from "./context/characterContext";
import { GameProvider } from "./context/gameContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GameProvider>
      <CharacterProvider>
        <App />
      </CharacterProvider>
    </GameProvider>
  </StrictMode>
);
