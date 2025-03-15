import { createFileRoute } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";

export const Route = createFileRoute("/game/read")({
  component: Read,
});

function Read() {
  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        This is a read
        <input className="bg-blue-900" type="text" />
        <button onClick={() => {}}>Rend!</button>
      </div>
    </Overlay>
  );
}

export default Read;