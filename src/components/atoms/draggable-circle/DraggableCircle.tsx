import { useState } from "react";

import useDraggable from "../../../hooks/useDraggable";
import type { Position2D } from "../../../hooks/useTriangle";

export type DraggableCircleProps = {
  radius: number;
  posX: number;
  posY: number;
  onPositionChange: (position: Position2D) => void;
};

export function DraggableCircle({
  radius,
  posX,
  posY,
  onPositionChange,
}: DraggableCircleProps) {
  const [circleRef] = useDraggable<SVGCircleElement>({ onDrag });
  const [[x, y], setCirclePosition] = useState([posX, posY]);

  return (
    <circle
      ref={circleRef}
      className="fill-light-blue stroke-1 stroke-light-blue hover:fill-dark-blue cursor-move"
      cx={x}
      cy={y}
      r={radius}
    />
  );

  function onDrag(position: Position2D) {
    setCirclePosition(position);
    onPositionChange(position);
  }
}
