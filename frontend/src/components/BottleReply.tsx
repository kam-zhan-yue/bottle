import { useState } from "react";

interface BottleReplyProps {
  onReply: (message: string) => void;
  onForward: (message: string) => void;
  onBack: () => void;
}

const BottleReply = ({ onReply, onForward, onBack }: BottleReplyProps) => {
  const [message, setMessage] = useState("");
  return (
    <div className="relative w-full h-auto max-w-xl">
      <p
        className="text-xl text-center leading-tight mb-4"
        style={{ fontFamily: "PixelifySans", color: "#875A3A" }}
      >
        Reply:
      </p>
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="bg-transparent text-black placeholder-black text-lg w-full p-2 border-none outline-none resize-none h-30 overflow-auto text-left"
        placeholder="Reply here..."
        style={{
          fontFamily: "PixelifySans",
          whiteSpace: "pre-wrap",
        }}
      />
      <div className="w-full flex justify-center items-center mt-6">
        <button disabled={message === ""} onClick={() => onReply(message)}>
          Reply
        </button>
        <button onClick={() => onForward(message)}>Foward</button>
        <button onClick={() => onBack()}>Back</button>
      </div>
    </div>
  );
};

export default BottleReply;
