import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import { EventBus } from "../EventBus";
import Overlay from "../components/Overlay";
import { InteractionType } from "../utils/InteractionType";
import Read from "../components/Read";
import Send from "../components/Send";
import useWebSocket from "react-use-websocket";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const WS_URL = "localhost/ws/";

// Helper function to get cookie
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

// Function to refresh access token
const refreshAccessToken = async () => {
  const refreshToken = getCookie("refresh_token");

  if (refreshToken) {
    try {
      const response = await axios.post("/api/token/refresh/", {
        refresh_token: refreshToken,
      });
      localStorage.setItem("access_token", response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      // Handle logout or redirect to login page
      return null;
    }
  }
  return null;
};

export const Route = createFileRoute("/game")({
  component: Game,

  loader: async () => {
    console.log("test");
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decodedToken: any = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.log("Access token expired, refreshing...");
        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          // Token successfully refreshed, you can return or set user state here
          console.log("Access token refreshed");
        } else {
          // Handle redirect to login or log out if refresh fails
          console.log("Unable to refresh token, redirecting to login...");
          redirect({
            to: "/login",
            throw: true,
          });
          return;
        }
      } else {
        console.log("Access token valid");
        // If the token is valid, you can continue as normal
      }
    } else {
      console.log("No access token found, redirecting to login...");
      redirect({
        to: "/login",
        throw: true,
      });
      return;
    }
  },
});

function Game() {
  const { island, user } = useContext(GameContext) as GameContextType;
  const navigate = useNavigate();
  const [state, setState] = useState<"game" | "read" | "send">("game");

  const wsProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  const wsUrl = `${wsProtocol}${WS_URL}?user_id=${user}`;

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(wsUrl, {
    share: true,
  });

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
      island?.fillMailbox();
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
