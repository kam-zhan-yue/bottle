import { createContext } from "react";

export interface WebSocketContextType {
  sendJsonMessage: (message: JSON) => void;
  lastJsonMessage: JSON | null;
}

export const WebSocketContext = createContext<WebSocketContextType>({
  sendJsonMessage: () => {},
  lastJsonMessage: null,
});
