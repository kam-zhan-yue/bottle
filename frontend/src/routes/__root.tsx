import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Game from "../game/Game";
import "../index.css";
import { GameProvider } from "../game/GameProvider";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <GameProvider>
        <div id="app">
          <Game />
          <Outlet />
          <TanStackRouterDevtools />
        </div>
      </GameProvider>
    </>
  );
}
