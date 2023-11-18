import React from "react";
import { useDrag } from "react-dnd";
import { Card, CardBody } from "@chakra-ui/react";
import Image from "next/image";

interface DragItem {
  id: number;
}

interface CardProps {
  id: number;
  position: { x: number; y: number };
  onMove: (id: number, position: { x: number; y: number }) => void;
}

const Types = {
  CARD: "card",
};

export const CardPlayer: React.FC<CardProps> = ({ id, position, onMove }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: Types.CARD,
    item: { id },
    end: (item: DragItem, monitor) => {
      // Only move the item if it was dropped on a target
      if (!monitor.didDrop()) {
        return;
      }

      const dropResult = monitor.getDropResult();
      if (item && dropResult && dropResult.position) {
        // Adjust the position with respect to the DroppableField
        onMove(item.id, dropResult.position);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    left: position.x,
    top: position.y,
    opacity: isDragging ? 0.5 : 1,
    cursor: "move", // Add a cursor style for visual feedback
  };

  return (
    <div ref={dragRef} style={cardStyle}>
      <Card maxW="sm">
        <CardBody>
          <Image src="/SoccerCard.png" width={100} height={200} alt="logo" />
        </CardBody>
      </Card>
    </div>
  );
};
