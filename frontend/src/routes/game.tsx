import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useContext, useEffect } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import { EventBus } from "../EventBus";
import Overlay from "../components/Overlay";
import { WebSocketProvider } from "../contexts/WebSocketProvider";
import {
  WebSocketContext,
  WebSocketContextType,
} from "../contexts/WebSocketContext";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;
  const { lastJsonMessage } = useContext(
    WebSocketContext,
  ) as WebSocketContextType;
  useEffect(() => {
    if (lastJsonMessage) {
      console.log("Game: Received message:", lastJsonMessage);
    } else {
      console.log("Game: No message received");
    }
  }, [lastJsonMessage]);

  const navigate = useNavigate();

  useEffect(() => {
    if (island) {
      island.initPlayer();
    }
  }, [island]);

  useEffect(() => {
    console.log("Initialising EventBus listeners");

    EventBus.on("mailbox", () => {
      console.log("React show mailbox");
      navigate({ to: "/game/read" });
      island?.switchState("ui");
    });

    EventBus.on("note", () => {
      console.log("React send note");
      navigate({ to: "/game/send" });
      island?.switchState("ui");
    });

    return () => {
      EventBus.off("mailbox");
      EventBus.off("note");
    };
  }, [user, navigate]);

  return (
    <WebSocketProvider>
      <Overlay>
        <h1>Welcome {user}</h1>
        <Outlet />
      </Overlay>
    </WebSocketProvider>
  );
}
