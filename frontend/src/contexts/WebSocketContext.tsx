import { createContext } from "react";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

export interface WebSocketContextType {
  sendJsonMessage: SendJsonMessage;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lastJsonMessage: any;
}

export const WebSocketContext = createContext<WebSocketContextType>({
  sendJsonMessage: () => {},
  lastJsonMessage: null,
});
