import got_it_button from "../assets/got_it_button.png";
import { Background } from "./Background";
import Overlay from "./Overlay";

interface TutorialProps {
  onTutorialCompleted: () => void;
}

const TutorialComponent = ({ onTutorialCompleted }: TutorialProps) => {
  const handleClick = () => {
    onTutorialCompleted();
  };

  return (
    <>
      <Background />
      <Overlay>
        <div className="flex w-full h-full items-center justify-center">
          <div
            className="bg-black/80 rounded-2xl flex flex-col items-center justify-center p-4 w-150 h-130"
            style={{ fontFamily: "PixelifySans", color: "#FFFFFF" }}
          >
            <h1 className="text-center">Welcome to Message in a Bottle</h1>
            <div className="flex flex-col items-center justify-center mb-5">
              <ul>
                <li className="p-2">Use keys W, A, S, D to move around</li>
                <li className="p-2">Press SPACE to interact with an object</li>
                <li className="p-2">Send messages by interacting with DESK</li>
                <li className="p-2">
                  Receive and reply to messages by interacting with MAILBOX
                </li>
              </ul>
            </div>

            <button
              onClick={handleClick}
              className="w-30 h-12 bg-no-repeat bg-contain border-none outline-none focus:outline-none active:outline-none flex items-center justify-center"
              style={{
                backgroundImage: `url(${got_it_button})`,
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
            ></button>
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default TutorialComponent;
