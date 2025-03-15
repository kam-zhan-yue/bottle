import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import Overlay from "../components/Overlay";
import useWebSocket from "react-use-websocket";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { user } = useContext(GameContext) as GameContextType;

  const WS_URL = "ws://localhost:8080/ws";
  const { sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { user },
  });

  useEffect(() => {
    if (!user) return;
    sendJsonMessage({
      body: "text",
    });
  }, [sendJsonMessage, user]);

  return (
    <Overlay>
      <h1>Welcome {user}</h1>
      <Outlet />
    </Overlay>
  );
}
