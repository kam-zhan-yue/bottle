import "./App.css";
import Game from "./game/Game";
import React, { useRef } from "react";
import { Island } from "./game/scenes/Island.tsx";

function App() {
  const gameRef = useRef<Island>(null);
  return (
    <>
      <div id="app">
        <Game ref={gameRef} />
      </div>
    </>
  );
}

export default App;
