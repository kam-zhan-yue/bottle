import { createFileRoute } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import { EventBus } from "../EventBus";
import Overlay from "../components/Overlay";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { island } = useContext(GameContext) as GameContextType;
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    EventBus.on("update", (elapsedTime: number) => {
      setElapsedTime(elapsedTime);
    });
  }, []);

  return (
    <>
      <Overlay>
        <div className="p-2">
          {island && <p>Island Title: {island.title}</p>}
        </div>
        <div className="p-2">{island && <p>Time: {elapsedTime}</p>}</div>
      </Overlay>
    </>
  );
}
