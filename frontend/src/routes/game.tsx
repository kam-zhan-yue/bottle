import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import { EventBus } from "../EventBus";
import Overlay from "../components/Overlay";
import { InteractionType } from "../utils/InteractionType";
import Read from "../components/Read";
import Send from "../components/Send";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://localhost/ws/";

export const Route = createFileRoute("/game")({
  component: Game,
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;
  const navigate = useNavigate();
  const [state, setState] = useState<"game" | "read" | "send">("game");

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    if (lastJsonMessage) {
      console.log("Game Received message:", lastJsonMessage);
    } else {
      console.log("Game No message received");
    }
  }, [lastJsonMessage]);

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
      setState("read");
      island?.switchState("ui");
    });

    registerEvent("note", () => {
      setState("send");
      island?.switchState("ui");
    });

    return () => {
      unregisterEvent("mailbox");
      unregisterEvent("note");
    };
  }, [user, navigate, island]);

  const backToGame = () => {
    setState("game");
  };

  return (
    <Overlay>
      <h1>Welcome {user}</h1>
      {state === "read" && <Read onCancel={backToGame} />}
      {state === "send" && (
        <Send sendJsonMessage={sendJsonMessage} onCancel={backToGame} />
      )}
    </Overlay>
  );
}
