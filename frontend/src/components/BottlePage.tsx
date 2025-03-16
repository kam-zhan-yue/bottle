import { useContext } from "react";
import { Bottle } from "../api/types/bottle";
import { Message } from "../api/types/message";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { MessageAction } from "../utils/Interaction";
import { GameContext, GameContextType } from "../game/GameContext";
import { useReply } from "../api/hooks/use-reply";
import { useForward } from "../api/hooks/use-forward";
import BottleReply from "./BottleReply";
import Messages from "./Messages";

interface BottlePageProps {
  bottle: Bottle;
  sendJsonMessage: SendJsonMessage;
  onComplete: () => void;
}

const BottlePage = ({
  bottle,
  sendJsonMessage,
  onComplete,
}: BottlePageProps) => {
  const { island, user } = useContext(GameContext) as GameContextType;
  const { mutate: mutateReply } = useReply();
  const { mutate: mutateForward } = useForward();

  const onReply = (message: string) => {
    console.log("Replying ", message);

    mutateReply(
      {
        bottle_id: bottle.id,
        message,
      },
      {
        onSuccess: (data) => {
          console.log("Reply Completed! ", data);

          sendJsonMessage({
            action: MessageAction.REPLY.toString(),
            message_id: data.data.message_id,
            bottle_id: bottle.id,
            user_id: user,
          });
          onComplete();
          island?.replyBottle();
          island?.switchState("game");
        },
      },
    );
  };

  const onForward = (message: string) => {
    console.log("Forwarding ", message);
    mutateForward(
      {
        bottle_id: bottle.id,
        message,
      },
      {
        onSuccess: (data) => {
          console.log("Forward Completed! ", data);

          sendJsonMessage({
            action: MessageAction.FORWARD.toString(),
            bottle_id: bottle.id,
            user_id: user,
          });
          onComplete();
          island?.replyBottle();
          island?.switchState("game");
        },
      },
    );
  };

  // For testing purposes
  // const messages: Message[] = [
  //   {
  //     id: "message1",
  //     bottleId: bottle.id,
  //     text: "This is the most recent message",
  //     sender: "sender2",
  //     createdAt: new Date("2025-03-16T12:00:00Z"), // Hardcoded timestamp
  //   },
  //   {
  //     id: "message2",
  //     bottleId: bottle.id,
  //     text: "This is a response 1",
  //     sender: "sender3",
  //     createdAt: new Date("2025-03-16T11:30:00Z"), // Older timestamp
  //   },
  //   {
  //     id: "message4",
  //     bottleId: bottle.id,
  //     text: "This is a response 2",
  //     sender: "sender3",
  //     createdAt: new Date("2025-03-16T11:30:00Z"), // Older timestamp
  //   },
  //   {
  //     id: "message3", // Fix duplicate ID
  //     bottleId: bottle.id,
  //     text: "This is the original message",
  //     sender: bottle.creator,
  //     createdAt: new Date("2025-03-16T11:00:00Z"), // Even older timestamp
  //   },
  // ];
  
  // Needed because we mismatched the incoming attribute names
  const map_message = (data: any): Message => {
    return {
      id: data.id,
      bottleId: data.bottle,
      text: data.text,
      sender: data.sender,
      createdAt: data.created_at
    };
  };

  const messages: Message[] = bottle.messages.map(map_message);
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ fontFamily: "PixelifySans", color: "#875A3A" }}
    >
      <Messages messages={messages} />
      <BottleReply
        onReply={onReply}
        onForward={onForward}
        onBack={onComplete}
      />
    </div>
  );
};

export default BottlePage;
