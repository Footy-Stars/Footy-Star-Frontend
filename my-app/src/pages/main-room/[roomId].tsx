import { CardPlayer } from "@/components/CardPlayer.tsx/CardPlayer";
import { DroppableField } from "@/components/DroppableField/DroppableField";
import { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the Position interface
interface Position {
  x: number;
  y: number;
}

export default function RoomId() {
  const [strikerCard, setStrikerCard] = useState<number[]>([1, 2]);
  const [goalKeeperCard, setGoalKeeperCard] = useState<number[]>([]);
  const [players, setPlayers] = useState<{ [key: number]: Position }>({
    1: { x: 100, y: 100 },
    2: { x: 150, y: 100 },
    // Ensure all player IDs from strikerCard and goalKeeperCard have initial positions
  });
  // Inside your component
  const droppableFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logMouseClickPosition = (e: MouseEvent) => {
      if (droppableFieldRef.current) {
        const rect = droppableFieldRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the droppable area
        const y = e.clientY - rect.top; // y position within the droppable area
        console.log("Mouse click position:", { x, y }); // Log the mouse click position
      }
    };

    const droppableArea = droppableFieldRef.current;
    droppableArea?.addEventListener("click", logMouseClickPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      droppableArea?.removeEventListener("click", logMouseClickPosition);
    };
  }, []);

  const isWithinLeftLane = (x: number) => {
    const leftLaneStartX = 287;
    const leftLaneEndX = 634;
    return x >= leftLaneStartX && x <= leftLaneEndX;
  };

  const movePlayer = (playerId: number, newPosition: Position) => {
    setPlayers((prevPlayers) => {
      const updatedPlayers = {
        ...prevPlayers,
        [playerId]: newPosition,
      };
      console.log("update player", updatedPlayers); // Log the new state for debugging
      return updatedPlayers;
    });
  };

  const handleDropPlayer = (id: number, position: Position) => {
    // Check if the dropped x position is within the left lane
    if (isWithinLeftLane(position.x)) {
      // If it is within the lane, update the player's position
      // You may want to adjust the y position to ensure it's within the field's boundaries
      const newY = Math.max(89, Math.min(position.y, 620));
      movePlayer(id, { x: position.x, y: newY });
    } else {
      // If it's not within the lane, you can choose to not move the card,
      // move it back to a default position, or handle as needed
      console.log(`Player ID ${id} dropped outside the left lane`);
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="flex justify-center">
          <DroppableField onDropPlayer={handleDropPlayer}>
            <div
              ref={droppableFieldRef}
              className="game-background w-[1440px] h-[700px]"
            ></div>
          </DroppableField>
        </div>
        <div>
          <h1>All the cards you owned</h1>
          <div>
            <h1>Player</h1>
            <div className="flex droppable-field">
              {strikerCard.map((card) => (
                <CardPlayer
                  key={card}
                  id={card}
                  position={players[card] ?? { x: 0, y: 0 }} // Fallback to a default position
                  onMove={movePlayer}
                />
              ))}
            </div>
          </div>
          <div>
            <h1>Goal Keeper</h1>
            <div>
              {goalKeeperCard.map((card) => {
                return <div key={card}></div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
