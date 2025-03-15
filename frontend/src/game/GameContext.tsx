import React from "react";
import { Island } from "./scenes/Island.tsx";

export interface GameContextType {
  user: string;
  setUser: (user: string) => void;
  island: Island | null;
  setIsland: (island: Island | null) => void;
}

export const GameContext = React.createContext<GameContextType>({
  user: "",
  setUser: () => {},
  island: null,
  setIsland: () => {},
});
