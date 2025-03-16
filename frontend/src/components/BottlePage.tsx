import { useContext, useState } from "react";
import { Bottle } from "../api/types/bottle";
import { Message } from "../api/types/message";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import { MessageAction } from "../utils/Interaction";
import { GameContext, GameContextType } from "../game/GameContext";

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
  const [message, setMessage] = useState("");

  const onReply = () => {
    console.log("Replying ", message);
    sendJsonMessage({
      action: MessageAction.REPLY.toString(),
      bottle_id: bottle.id,
      user_id: user,
      message,
    });
    onComplete();
    island?.replyBottle();
    island?.switchState("game");
  };

  const onForward = () => {
    console.log("Replying ", message);
    sendJsonMessage({
      action: MessageAction.REPLY.toString(),
      bottle_id: bottle.id,
      user_id: user,
      message,
    });
    onComplete();
    island?.replyBottle();
    island?.switchState("game");
  };

  // For testing purposes
  const messages: Message[] = [
    {
      id: "message1",
      bottleId: bottle.id,
      text: "This is the most recent message",
      sender: "sender2",
      createdAt: new Date("2025-03-16T12:00:00Z"), // Hardcoded timestamp
    },
    {
      id: "message2",
      bottleId: bottle.id,
      text: "This is a response 1",
      sender: "sender3",
      createdAt: new Date("2025-03-16T11:30:00Z"), // Older timestamp
    },
    {
      id: "message4",
      bottleId: bottle.id,
      text: "This is a response 2",
      sender: "sender3",
      createdAt: new Date("2025-03-16T11:30:00Z"), // Older timestamp
    },
    {
      id: "message3", // Fix duplicate ID
      bottleId: bottle.id,
      text: "This is the original message",
      sender: bottle.creator,
      createdAt: new Date("2025-03-16T11:00:00Z"), // Even older timestamp
    },
  ];
  const sortedMessages = [...messages].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const originalMessage = sortedMessages[sortedMessages.length - 1];
  const recentMessage = sortedMessages[0];

  const otherResponses = sortedMessages.slice(1, sortedMessages.length - 1);

  return (
    <div className="flex flex-col items-center justify-center" style={{ fontFamily: "PixelifySans", color: "#875A3A"}}>
      <h3>Original Message</h3>
      <p>{originalMessage?.text}</p>

      {sortedMessages.length > 1 && (
        <>
          <h3>Most Recent Response</h3>
          <p>{recentMessage?.text}</p>
        </>
      )}

      {sortedMessages.length > 2 && (
        <>
          <h3>Other Responses</h3>
          {otherResponses.map((response) => (
            <MessageEntry bg_color="" text={response.text}/>
          ))}
        </>
      )}
      <div className="absolute w-1/2 h-auto max-w-xl p-15">
        <p
          className="text-xl text-center leading-tight mb-4"
          style={{ fontFamily: "PixelifySans", color: "#875A3A" }}
        >
          Send a Message:
        </p>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent text-black placeholder-black text-lg w-4/4 p-2 border-none outline-none resize-none h-50 overflow-auto"
          placeholder="Type here..."
          style={{
            fontFamily: "PixelifySans",
            whiteSpace: "pre-wrap",
          }}
        />
        <div className="w-full flex justify-center items-center mt-6">
          <button disabled={message === ""} onClick={() => onReply()}>
            Reply
          </button>
          <button disabled={message === ""} onClick={() => onReply()}>
            Foward
          </button>
        </div>
      </div>
    </div>
  );
};

interface MessageProps {
  text: String
  bg_color: String
}

const MessageEntry = ({text, bg_color}: MessageProps) => {
  return <div className={`h-12${bg_color}`}>
    <h2>{text}</h2>
  </div>
}

export default BottlePage;

