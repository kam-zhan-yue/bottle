import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useContext, useState, useEffect } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import { EventBus } from "../EventBus";
import Overlay from "../components/Overlay";
import useWebSocket from "react-use-websocket";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;
  const navigate = useNavigate();

  const WS_URL = "ws://localhost:8000/ws/chat/testroom/";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  if (lastJsonMessage) {
    console.log("Last Json Message is ", lastJsonMessage);
  }

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

  useEffect(() => {
    console.log("Initialising EventBus listeners");

    EventBus.on("mailbox", () => {
      console.log("React show mailbox");
      navigate({ to: "/game/read" });
    });

    EventBus.on("note", () => {
      console.log("React send note");
      navigate({ to: "/game/send" });
    });

    return () => {
      EventBus.off("mailbox");
      EventBus.off("note");
    };

  }, []);

  return (
    <Overlay>
      <h1>Welcome {user}</h1>

      <Outlet />
    </Overlay>
  );
}
