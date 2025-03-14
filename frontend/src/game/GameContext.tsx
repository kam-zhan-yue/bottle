import React from "react";
import { Island } from "./scenes/Island.tsx";

export interface GameContextType {
  island: Island | null;
  setIsland: (island: Island | null) => void;
}

export const GameContext = React.createContext<GameContextType>({
  island: null,
  setIsland: () => {},
});
