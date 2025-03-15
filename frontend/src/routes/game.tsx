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
import { InteractionType } from "../utils/InteractionType";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;
  const navigate = useNavigate();

  const { message: webMessage } = useContext(
    WebSocketContext,
  ) as WebSocketContextType;

  useEffect(() => {
    if (webMessage) {
      console.log("Game Received message:", webMessage);
    } else {
      console.log("Game No message received");
    }
  }, [webMessage]);

  useEffect(() => {
    if (island) {
      island.initPlayer();
    }
  }, [island]);

  useEffect(() => {
    const registerEvent = (event: InteractionType, fn: () => void) => {
      EventBus.on(event, fn);
    };

    const unregisterEvent = (event: InteractionType) => {
      EventBus.off(event);
    };

    registerEvent("mailbox", () => {
      navigate({ to: "/game/read" });
    });

    registerEvent("note", () => {
      navigate({ to: "/game/send" });
    });

    return () => {
      unregisterEvent("mailbox");
      unregisterEvent("note");
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
