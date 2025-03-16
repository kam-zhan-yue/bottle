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
        user_id: user,
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
        user_id: user,
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

  const messages: Message[] = bottle.messages || [];

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
