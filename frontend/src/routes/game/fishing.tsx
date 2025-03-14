import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/fishing")({
  component: Fishing,
});

function Fishing() {
  return <div>Hello "/game/fishing"!</div>;
}
