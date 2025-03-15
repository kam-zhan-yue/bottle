import { Message } from "./message";

export interface Bottle {
  id: string;
  creator: string;
  receiver: string;
  messages: Message[];
}
