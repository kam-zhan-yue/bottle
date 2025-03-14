import React, { useRef } from "react";
import { Island } from "../game/scenes/Island";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Game from "../game/Game";
import "../index.css";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const gameRef = useRef<Island>(null);
  return (
    <>
      <div id="app">
        <Game ref={gameRef} />
        <Outlet />
        <TanStackRouterDevtools />
      </div>
    </>
  );
}
