import { createFileRoute } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";
import scroll from "../../assets/scroll.png";

export const Route = createFileRoute("/game/send")({
  component: Send,
});

function Send() {
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
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={() => console.log("Message sent!")}
          >
            Send!
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export default Send;
