import { useState } from "react";
import replyButtonDefault from "../assets/reply_button_default.png";
import replyButtonHover from "../assets/reply_button_hover.png";
import forwardButtonDefault from "../assets/forward_button_default.png";
import forwardButtonHover from "../assets/forward_button_hover.png";
import backButtonDefault from "../assets/back_button_default.png";
import backButtonHover from "../assets/back_button_hover.png";

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
      <div className="w-full flex justify-center items-center mt-6 gap-4">
        <button onClick={() => onReply(message)}
          className="w-30 h-12 bg-no-repeat bg-contain border-none outline-none focus:outline-none active:outline-none flex items-center justify-center"
          style={{
            backgroundImage: `url(${replyButtonDefault})`,
            backgroundSize: "contain",
            backgroundColor: "transparent",
            fontFamily: "PixelifySans",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundImage = `url(${replyButtonHover})`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundImage = `url(${replyButtonDefault})`)
          }
        >
        </button>
        <button onClick={() => onForward(message)}
          className="w-30 h-12 bg-no-repeat bg-contain border-none outline-none focus:outline-none active:outline-none flex items-center justify-center"
          style={{
            backgroundImage: `url(${forwardButtonDefault})`,
            backgroundSize: "contain",
            backgroundColor: "transparent",
            fontFamily: "PixelifySans",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundImage = `url(${forwardButtonHover})`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundImage = `url(${forwardButtonDefault})`)
          }
        >
        </button>
        <button onClick={() => onBack()}
          className="w-30 h-12 bg-no-repeat bg-contain border-none outline-none focus:outline-none active:outline-none flex items-center justify-center"
          style={{
            backgroundImage: `url(${backButtonDefault})`,
            backgroundSize: "contain",
            backgroundColor: "transparent",
            fontFamily: "PixelifySans",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundImage = `url(${backButtonHover})`)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundImage = `url(${backButtonDefault})`)
          }
        >
        </button>
      </div>
    </div>
  );
};

export default BottleReply;
