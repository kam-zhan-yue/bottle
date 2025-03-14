import {useEffect, useRef, forwardRef } from 'react';
import Phaser from 'phaser';
import { Boot } from './scenes/Boot.tsx';
import { Island } from './scenes/Island.tsx';

type GameProps = {};

const Game = forwardRef<Island, GameProps>((_props, ref) => {
  const phaserGameRef = useRef<Phaser.Game>(null);

  // Game Initiation
  useEffect(() => {
    const bootScene: Boot = new Boot();
    const islandScene: Island = new Island();
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1000,
      height: 1000,
      parent: 'game-container',
      backgroundColor: '#1f1137',
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 10
      },
      physics: {
        default: 'arcade',
        arcade: {
          debug: true,
          gravity: { x: 0, y: 0 },
        },
      },
      scene: [bootScene, islandScene],
    };

    const game = new Phaser.Game(config);
    phaserGameRef.current = game;
    if(ref && islandScene) {
      if(typeof ref === 'function') {
        ref(islandScene);
      } else {
        ref.current = islandScene;
      }
    }

    return () => {
      game.destroy(true);
    };
  }, [ref]);

  return (
      <div id="game-container">
      </div>
  );
});

export default Game;
