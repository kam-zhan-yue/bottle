import React, { ReactNode, useEffect, useState } from "react";
import { GameContext } from "./GameContext";
import { Island } from "./scenes/Island";

export const GameProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [island, setIsland] = useState<Island | null>(null);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    const savedUserId = sessionStorage.getItem("userId");
    if (savedUserId) {
      console.log("Found Session, using user ", savedUserId);
      setUser(savedUserId);
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("userId", user);
    }
  }, [user]);

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
