import { Bottle } from "../api/types/bottle";
import bottleImage from "../assets/green_bottle.png";

interface BottlePopupProps {
  bottle: Bottle;
  onClick: (bottle: Bottle) => void;
}

const BottlePopup = ({ bottle, onClick }: BottlePopupProps) => {
  return (
    <div
      onClick={() => onClick(bottle)}
      className="flex flex-col items-center justify-center bg-[#E8C090] p-4 rounded-md shadow-md cursor-pointer transition-all duration-200 transform hover:scale-110 hover:shadow-lg min-w-24 min-h-24"
    >
      {/* <span
        className="text-xs font-bold"
        style={{ fontFamily: "PixelifySans", color: "red" }}
      >
        NEW
      </span> */}
      <img src={bottleImage} alt="Bottle" className="bottle p-1.5" />
      {/* <p
        className="text-sm"
        style={{ fontFamily: "PixelifySans", color: "#4A3628" }}
      >
        2min 04sec
      </p> */}
    </div>
  );
};

export default BottlePopup;
