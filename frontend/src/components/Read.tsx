import letterbox from "../assets/letterbox.png";
import closeButton from "../assets/close_button.png";
import mailboxIcon from "../assets/mailbox.png";
import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import Overlay from "./Overlay";
import { Bottle } from "../api/types/bottle";
import BottlePage from "./BottlePage";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import "../index.css";
import Bottles from "./Bottles";

interface ReadProps {
  sendJsonMessage: SendJsonMessage;
  onCancel?: () => void;
}

const Read = ({ sendJsonMessage, onCancel }: ReadProps) => {
  const { island } = useContext(GameContext) as GameContextType;
  const [selectedBottle, setSelectedBottle] = useState<Bottle | null>(null);

  const onClick = () => {
    onCancel?.();
    island?.switchState("game");
  };

  const handleClick = (bottle: Bottle) => {
    console.log(`Clicked on bottle: ${bottle.id}`);
    setSelectedBottle(bottle);
  };

  const handleCloseBottlePage = () => {
    setSelectedBottle(null);
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
              className="pixel w-10 h-10 bg-no-repeat bg-contain border-none outline-none"
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
            {selectedBottle && (
              <BottlePage
                sendJsonMessage={sendJsonMessage}
                bottle={selectedBottle}
                onComplete={handleCloseBottlePage}
              />
            )}
            {!selectedBottle && <Bottles handleClick={handleClick} />}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Read;
