import { useContext } from "react";
import { useRead } from "../api/hooks/use-read";
import { Bottle } from "../api/types/bottle";
import BottlePopup from "./BottlePopup";
import { GameContext, GameContextType } from "../game/GameContext";
import { Message } from "../api/types/message";

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

  const bottleData = data?.data || [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapMessage = (data: any): Message => {
    return {
      id: data.id,
      text: data.text,
      sender: data.sender,
      createdAt: data.created_at,
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapBottle = (data: any): Bottle => {
    return {
      id: data.bottle_id,
      creator: data.creator,
      receiver: data.receiver,
      messages: data.messages.map(mapMessage) || [],
    };
  };

  const bottles: Bottle[] = bottleData.map(mapBottle);

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
