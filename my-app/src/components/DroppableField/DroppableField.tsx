import { useDrop } from "react-dnd";
import React, { useRef } from "react";

interface Position {
  x: number;
  y: number;
}

interface DroppableFieldProps {
  children: React.ReactNode;
}

export const DroppableField: React.FC<DroppableFieldProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: "PLAYER",
    // Inside DroppableField component
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      console.log(clientOffset);
      if (clientOffset) {
        // Adjust the position to be relative to the DroppableField
        const rect = ref.current.getBoundingClientRect();
        const adjustedPosition = {
          x: clientOffset.x - rect.left,
          y: clientOffset.y - rect.top,
        };
        // Pass the adjusted position as the drop result
        return { position: adjustedPosition };
      }
      return undefined;
    },
  }));

  const style: React.CSSProperties = {
    // Other styles as needed
    backgroundSize: "100%", // This ensures the gradient spans the entire width
  };

  // Create the gradient pattern based on the image provided
  const stripesPattern = `
    repeating-linear-gradient(
      to right,
      white 10%, 
      transparent 10% 20%,
      white 20% 30%,
      transparent 30% 40%,
      white 40% 50%,
      transparent 50% 60%,
      white 60% 70%,
      transparent 70% 80%,
      white 80% 90%,
      transparent 90% 100%
    )
  `;

  // Add the background gradient to the style
  style.backgroundImage = stripesPattern;

  return (
    <div ref={drop} style={style}>
      {children}
    </div>
  );
};
