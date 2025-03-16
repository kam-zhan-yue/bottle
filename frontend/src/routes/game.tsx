import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
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
  loader: () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      redirect({
        to: "/login",
        throw: true,
      });
    }
  },
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;
  const navigate = useNavigate();
  const [state, setState] = useState<"game" | "read" | "send">("game");
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });
  const [sentBottles, setSentBottles] = useState<string[]>([]);

  useEffect(() => {
    if (lastJsonMessage) {
      console.log("Game Received message:", lastJsonMessage);
      const receiver = lastJsonMessage.data.receiver_id;
      const bottle = lastJsonMessage.data.bottle_id;
      if (receiver !== user) {
        console.log("This message is for someone else.");
      } else {
        island?.spawnBottle(bottle);
      }
    } else {
      console.log("Game No message received");
    }
  }, [island, lastJsonMessage, user]);

  useEffect(() => {
    if (island) {
      island.initPlayer();
    }
  }, [island]);

  useEffect(() => {
    const registerEvent = (
      event: InteractionType,
      fn: (id?: string) => void,
    ) => {
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

    registerEvent("bottle", (id?: string) => {
      console.log(`Bottle ${id} has reached the island!`);
      setSentBottles((prevBottles) =>
        prevBottles.filter((bottleId) => bottleId !== id),
      );
    });

    return () => {
      unregisterEvent("mailbox");
      unregisterEvent("note");
      unregisterEvent("bottle");
    };
  }, [user, navigate, island]);

  const backToGame = () => {
    setState("game");
  };

  return (
    <Overlay>
      <h1>Welcome {user}</h1>
      {state === "read" && (
        <Read sendJsonMessage={sendJsonMessage} onCancel={backToGame} />
      )}
      {state === "send" && (
        <Send sendJsonMessage={sendJsonMessage} onCancel={backToGame} />
      )}
    </Overlay>
  );
}
