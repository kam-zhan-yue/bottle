import scroll from "../assets/scroll.png";
import sendButtonDefault from "../assets/send_button_default.png";
import sendButtonHover from "../assets/send_button_hover.png";
import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import { MessageAction } from "../utils/Interaction";
import Overlay from "./Overlay";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

interface SendProps {
  sendJsonMessage: SendJsonMessage;
  onCancel: () => void;
}

const Send = ({ sendJsonMessage, onCancel }: SendProps) => {
  const { island, user } = useContext(GameContext) as GameContextType;

  const [message, setMessage] = useState("");

  const onSubmit = (message: string) => {
    console.log("Sending ", message);
    sendJsonMessage({
      action: MessageAction.CREATE.toString(),
      user_id: user,
      message,
    });
    onCancel?.();
    island?.switchState("game");
  };

  return (
    <Overlay>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(message);
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="absolute w-1/2 h-auto max-w-xl">
          <img src={scroll} alt="Scroll" className="scroll" />
        </div>
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
            <button
              type="submit"
              className="py-4 px-8 w-40 h-14 bg-no-repeat bg-contain border-none outline-none focus:outline-none active:outline-none"
              style={{
                backgroundImage: `url(${sendButtonDefault})`,
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
                (e.currentTarget.style.backgroundImage = `url(${sendButtonHover})`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundImage = `url(${sendButtonDefault})`)
              }
            />
          </div>
        </div>
      </form>
    </Overlay>
  );
};

export default Send;
