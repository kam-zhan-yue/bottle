import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useContext } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import Overlay from "../components/Overlay";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { user } = useContext(GameContext) as GameContextType;

  return (
    <Overlay>
      <h1>Welcome {user}</h1>
      <Outlet />
    </Overlay>
  );
}
