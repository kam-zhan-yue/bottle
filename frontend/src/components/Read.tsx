import letterbox from "../assets/letterbox.png";
import closeButton from "../assets/close_button.png";
import mailboxIcon from "../assets/mailbox.png";
import { useContext, useState } from "react";
import { GameContext, GameContextType } from "../game/GameContext";
import Overlay from "./Overlay";
import { useRead } from "../api/hooks/use-read";
import BottlePopup from "./BottlePopup";
import { Bottle } from "../api/types/bottle";
import BottlePage from "./BottlePage";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";

interface ReadProps {
  sendJsonMessage: SendJsonMessage;
  onCancel?: () => void;
}

const Read = ({ sendJsonMessage, onCancel }: ReadProps) => {
  const { island, user } = useContext(GameContext) as GameContextType;
  const { isPending, isError, data, error } = useRead(user);
  const [selectedBottle, setSelectedBottle] = useState<Bottle | null>(null);

  const onClick = () => {
    onCancel?.();
    island?.switchState("game");
  };

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const bottles: Bottle[] = data?.data || [];

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

            {selectedBottle && (
              <BottlePage
                sendJsonMessage={sendJsonMessage}
                bottle={selectedBottle}
                onComplete={handleCloseBottlePage}
              />
            )}
            {!selectedBottle && (
              <div className="flex gap-4 mt-2">
                {bottles.map((bottle) => (
                  <BottlePopup
                    key={bottle.id}
                    bottle={bottle}
                    onClick={handleClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default Read;
