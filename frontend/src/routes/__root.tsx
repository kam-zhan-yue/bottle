import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Game from "../game/Game";
import "../index.css";
import { GameProvider } from "../game/GameProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GameProvider>
          <div id="app">
            <Game />
            <Outlet />
            <TanStackRouterDevtools />
          </div>
        </GameProvider>
      </QueryClientProvider>
    </>
  );
}
