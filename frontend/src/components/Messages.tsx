import { Message } from "../api/types/message";
import MessageEntry from "./MessageEntry";

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

  otherResponses.forEach(element => {
    console.log(element);
  });
  return (
    <>
      <h3>Original Message</h3>
      <p>{originalMessage?.text}</p>

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
          <h3>Other Responses</h3>
          {otherResponses.map((response, index) => (
            <MessageEntry bg_color={index % 2 === 0 ? "#D5A770": "#FAD79D"} text={response.text} />
          ))}
        </>
      )}
    </>
  );
};

export default Messages;
