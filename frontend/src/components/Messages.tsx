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

  return (
    <>
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
            <MessageEntry bg_color="" text={response.text} />
          ))}
        </>
      )}
    </>
  );
};

export default Messages;
