import React, { ReactNode, useState } from "react";
import { GameContext } from "./GameContext";
import { Island } from "./scenes/Island";

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [island, setIsland] = useState<Island | null>(null);
  const [user, setUser] = useState<string>("");

  return (
    <>
      <GameContext.Provider
        value={{
          user: user,
          setUser: setUser,
          island: island,
          setIsland: setIsland,
        }}
      >
        {children}
      </GameContext.Provider>
    </>
  );
};
