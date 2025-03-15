import { createFileRoute, Link } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";
import { useContext } from "react";
import { GameContext, GameContextType } from "../../game/GameContext";

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useContext(GameContext) as GameContextType;

  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div>Welcome {user}</div>
        <Link to="/game/fishing">Fishing</Link>
        <Link to="/game/send">Send a Note</Link>
      </div>
    </Overlay>
  );
}
