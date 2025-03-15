import React, { ReactNode, useEffect, useState } from "react";
import { WebSocketContext } from "./WebSocketContext";
import useWebSocket from "react-use-websocket";

const WS_URL = "ws://localhost/ws/";

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
  });

  const [message, setMessage] = useState(lastJsonMessage);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log("WebSocketProvider", lastJsonMessage);
      setMessage({ ...lastJsonMessage }); // Ensure a new object reference
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (message) {
      console.log("Message is ", message);
    }
  }, [message]);

  return (
    <WebSocketContext.Provider
      value={{ sendJsonMessage, lastJsonMessage: message, message: message }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
