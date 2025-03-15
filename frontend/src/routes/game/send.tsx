import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";
import scroll from "../../assets/scroll.png";
import sendButtonDefault from "../../assets/send_button_default.png";
import sendButtonHover from "../../assets/send_button_hover.png";
import { GameContext, GameContextType } from "../../game/GameContext";
import { useContext } from "react";

export const Route = createFileRoute("/game/send")({
  component: Send,
});

function Send() {
  const navigate = useNavigate();
    const { island } = useContext(GameContext) as GameContextType;

  const onClick = () => {
    navigate({ to: "/game" })
    island?.switchState("game")
  }
  return (
    <Overlay>
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute w-1/2 h-auto max-w-xl">
          <img
              src={scroll}
              alt="Scroll"
              className="scroll"
            />
        </div>
        <div className="absolute w-1/2 h-auto max-w-xl p-15">
          <p className="text-xl text-center leading-tight mb-4" style={{ fontFamily: 'PixelifySans', color: '#875A3A' }}>
            Send a Message:
          </p>
          <textarea
            className="bg-transparent text-black placeholder-black text-lg w-4/4 p-2 border-none outline-none resize-none h-50 overflow-auto"
            placeholder="Type here..."
            style={{
              fontFamily: "PixelifySans",
              whiteSpace: "pre-wrap",
            }}
          />
          <div className="w-full flex justify-center items-center mt-6">
            <button
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
              onMouseEnter={(e) => (e.currentTarget.style.backgroundImage = `url(${sendButtonHover})`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = `url(${sendButtonDefault})`)}
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </Overlay>
  );
}

export default Send;
