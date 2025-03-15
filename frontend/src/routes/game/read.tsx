import { createFileRoute, useNavigate } from "@tanstack/react-router";
import Overlay from "../../components/Overlay";
import letterbox from "../../assets/letterbox.png";
import closeButton from "../../assets/close_button.png";
import mailboxIcon from "../../assets/mailbox.png";

export const Route = createFileRoute("/game/read")({
  component: Read,
});

function Read() {
  const navigate = useNavigate();
  return (
    <Overlay>
      <div className="w-full h-full flex items-center justify-center">
        <div className="absolute w-1/2 h-auto max-w-xl">
          <img
              src={letterbox}
              alt="Letterbox"
              className="letterbox"
            />
        </div>

        <div className="absolute w-1/2 h-auto max-w-xl p-10 flex flex-col items-center">
          
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
                  color: "#875A3A",
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
              onClick={() => navigate({ to: "/game" })}
            />
          </div>
        
        {/* <div className="absolute w-1/2 h-auto max-w-xl p-15">
          <p className="text-xl text-center leading-tight mb-4" style={{ fontFamily: 'PixelifySans', color: '#875A3A' }}>
            Send a Message:
          </p>
          <textarea
            className="bg-transparent text-black placeholder-black text-lg w-4/4 p-2 border-none outline-none resize-none h-50 overflow-auto"
            placeholder="Type here..."
            style={{
              fontFamily: "PixelifySans",
              whiteSpace: "pre-wrap",
            }} */}
          {/* /> */}
          {/* <div className="w-full flex justify-center items-center mt-6">
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
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundImage = `url(${sendButtonHover})`)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = `url(${sendButtonDefault})`)}
              onClick={() => navigate({ to: "/game" })}
            />
          </div> */}
        </div>
      </div>
    </Overlay>
  );
}

export default Read;