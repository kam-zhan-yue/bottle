import { createFileRoute } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";

export const Route = createFileRoute("/game/send")({
  component: Send,
});

function Send() {
  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        This is a send
        <input type="text" />
      </div>
    </Overlay>
  );
}
