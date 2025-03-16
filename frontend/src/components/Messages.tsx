import { Message } from "../api/types/message";
import MessageEntry from "./MessageEntry";
import { useState } from "react";

interface MessageProps {
  messages: Message[];
}

const Messages = ({ messages }: MessageProps) => {
  const sortedMessages = [...messages].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const originalMessage = sortedMessages[sortedMessages.length - 1];
  const recentMessage = sortedMessages[0];

  const otherResponses = sortedMessages.slice(1, sortedMessages.length - 1);

  const [messagesOpen, setMessagesOpen] = useState(false);

  const toggleDropdown = () => {
    console.log("Toggling")
    setMessagesOpen(!messagesOpen);
  }

  return (
    <>
      <p className="text-3xl p-3">{originalMessage?.text}</p>

      {sortedMessages.length > 1 && (
        <>
          <div className="rounded border border-[#875A3A] w-full">
            <p className="m-1 text-xs">Most Recent Response</p>
            <p className="m-1 mx-5">{recentMessage?.text}</p>
          </div>
        </>
      )}
      
      {sortedMessages.length > 2 && (
        <>
          <div className="self-start m-0 p-0 bg-transparent flex pt-2">
            <button onClick={toggleDropdown} type="button" className="message-dropdown">
              <img src={messagesOpen === true ? "/images/ArrowDown.svg": "/images/ArrowRight.svg"} alt="ArrowImg" />
            </button>
            <p className="px-2">{"View " + otherResponses.length + " responses"}</p>
          </div>
          {messagesOpen && (
            <>
              {otherResponses.map((response, index) => (
                <MessageEntry bg_color={index % 2 === 0 ? "#D5A770": "#FAD79D"} text={response.text} />
              ))}
            </>
          )}

        </>
      )}
    </>
  );
};

export default Messages;
