import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import Overlay from "../components/Overlay";
import useWebSocket from "react-use-websocket";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;

  const WS_URL = "ws://localhost:8000/ws/chat/testroom/";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (island) {
      island.initPlayer();
    }
  }, [island]);

  useEffect(() => {
    console.log("Send player");
    sendJsonMessage({
      message: "player is connected",
    });
  }, [sendJsonMessage]);

  useEffect(() => {
    if (!user) return;
    sendJsonMessage({
      message: "text",
    });
    console.log("Sending text");
  }, [sendJsonMessage, user]);

  if (lastJsonMessage) {
    console.log("Last Json Message is ", lastJsonMessage);
  }

  return (
    <Overlay>
      <h1>Welcome {user}</h1>
      <Outlet />
    </Overlay>
  );
}
