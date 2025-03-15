import { useEffect, useRef, useContext } from "react";
import Phaser from "phaser";
import { Boot } from "./scenes/Boot.tsx";
import { Island } from "./scenes/Island.tsx";
import { GameContext, GameContextType } from "./GameContext.tsx";
import { constants } from "./Constants.ts";

const Game = () => {
  const phaserGameRef = useRef<Phaser.Game>(null);
  const { setIsland } = useContext(GameContext) as GameContextType;

  // Game Initiation
  useEffect(() => {
    const bootScene: Boot = new Boot();
    const islandScene: Island = new Island();
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 300,
      height: 300,
      parent: "game-container",
      backgroundColor: "#65a4f8",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 10,
      },
      physics: {
        default: "arcade",
        arcade: {
          debug: constants.debug,
          gravity: { x: 0, y: 0 },
        },
      },
      scene: [bootScene, islandScene],
    };

    const game = new Phaser.Game(config);
    phaserGameRef.current = game;
    if (islandScene) {
      setIsland(islandScene);
    }

    return () => {
      game.destroy(true);
    };
  }, [setIsland]);

  return <div id="game-container"></div>;
};

export default Game;
