import letterbox from "../assets/letterbox.png";
import closeButton from "../assets/close_button.png";
import mailboxIcon from "../assets/mailbox.png";
import bottleImage from "../assets/green_bottle.png";
import { useContext } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import Overlay from "./Overlay";

interface ReadProps {
  onCancel?: () => void;
}

const Read = ({ onCancel }: ReadProps) => {
  const { island } = useContext(GameContext) as GameContextType;

  const onClick = () => {
    onCancel?.();
    island?.switchState("game");
  };

  return (
    <Overlay>
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute w-1/2 h-auto max-w-xl">
          <img src={letterbox} alt="Letterbox" className="letterbox" />
        </div>

        <div className="absolute w-1/2 h-auto max-w-xl p-15 flex flex-col items-center">
          <div className="flex justify-between items-center w-full px-4 mb-6">
            <div className="flex items-center gap-2">
              <img
                src={mailboxIcon}
                alt="Mailbox Icon"
                className="w-6 h-6"
                style={{
                  imageRendering: "pixelated",
                }}
              />
              <p
                className="text-xl font-bold"
                style={{
                  fontFamily: "PixelifySans",
                  color: "black",
                }}
              >
                MAILBOX
              </p>
            </div>

            <button
              className="w-10 h-10 bg-no-repeat bg-contain border-none outline-none"
              style={{
                backgroundImage: `url(${closeButton})`,
                backgroundSize: "contain",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                outline: "none",
                boxShadow: "none",
                imageRendering: "pixelated", // its not pixelating
              }}
              onClick={onClick}
            />
          </div>

          <div className="w-full px-4 mb-4">
            <p
              className="text-lg font-bold"
              style={{ fontFamily: "PixelifySans", color: "#875A3A" }}
            >
              Incoming
            </p>

            <div className="flex gap-4 mt-2">
              {/* placeholder for a bottel */}
              <div className="flex flex-col items-center bg-[#E8C090] p-4 rounded-md shadow-md">
                <span
                  className="text-xs font-bold"
                  style={{ fontFamily: "PixelifySans", color: "red" }}
                >
                  NEW
                </span>
                <img src={bottleImage} alt="Bottle" className="bottle" />
                <p
                  className="text-sm"
                  style={{ fontFamily: "PixelifySans", color: "#4A3628" }}
                >
                  2min 04sec
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Read;
