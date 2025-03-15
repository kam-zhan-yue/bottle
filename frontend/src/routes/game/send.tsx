import { createFileRoute } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";
import scroll from "../../assets/scroll.png";

export const Route = createFileRoute("/game/send")({
  component: Send,
});

function Send() {
  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        This is a send

        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src={scroll}
            alt="Send illustration"
            className="max-w-full max-h-full object-contain"
          />
        </div>


        <input className="bg-blue-900" type="text" />
        <button onClick={() => {}}>Send!</button>
      </div>
    </Overlay>
  );
}
