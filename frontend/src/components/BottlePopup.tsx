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
      className="flex flex-col items-center bg-[#E8C090] p-4 rounded-md shadow-md"
    >
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
  );
};

export default BottlePopup;
