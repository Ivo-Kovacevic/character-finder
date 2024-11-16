import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/styles/output.css";
import { CharacterProvider } from "./context/characterContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CharacterProvider>
      <App />
    </CharacterProvider>
  </StrictMode>
);
