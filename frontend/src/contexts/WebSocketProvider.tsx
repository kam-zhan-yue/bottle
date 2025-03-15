import React, { ReactNode, useEffect } from "react";
import { WebSocketContext } from "./WebSocketContext";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://localhost/ws/";

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  useEffect(() => {
    console.log("WebSocketProvider", lastJsonMessage);
  }, [lastJsonMessage]);

  return (
    <WebSocketContext.Provider value={{ sendJsonMessage, lastJsonMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};
