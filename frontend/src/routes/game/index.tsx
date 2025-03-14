import { createFileRoute, Link } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";

export const Route = createFileRoute("/game/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Overlay>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <Link to="/game/fishing">Fishing</Link>
        <Link to="/game/send">Send a Note</Link>
      </div>
    </Overlay>
  );
}
