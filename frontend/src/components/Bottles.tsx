import { useContext } from "react";
import { useRead } from "../api/hooks/use-read";
import { Bottle } from "../api/types/bottle";
import BottlePopup from "./BottlePopup";
import { GameContext, GameContextType } from "../game/GameContext";

interface BottlesProps {
  handleClick: (bottle: Bottle) => void;
}

const Bottles = ({ handleClick }: BottlesProps) => {
  const { island, user } = useContext(GameContext) as GameContextType;
  const { isPending, isError, data, error } = useRead(user);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const bottles: Bottle[] = data?.data || [];

  const islandBottles = island?.getBottles();

  const islandBottleIds = new Set(
    islandBottles?.map((bottle) => bottle.getId()) || [],
  );

  // We only want to show bottles that are not on the island
  const filteredBottles = bottles.filter(
    (bottle) => !islandBottleIds.has(bottle.id),
  );

  return (
    
    <div className="flex flex-col items-start mt-4">
      <h2 
        className="text-lg font-bold mb-2"
        style={{ fontFamily: "PixelifySans", color: "#875A3A" }}
      >
        Incoming
      </h2>

      <div className="flex gap-4">
        {filteredBottles.map((bottle) => (
          <BottlePopup key={bottle.id} bottle={bottle} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Bottles;
