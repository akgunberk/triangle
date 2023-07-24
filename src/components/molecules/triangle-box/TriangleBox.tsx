import useTriangle from "../../../hooks/useTriangle";
import { DraggableCircle, Triangle } from "../../atoms";

import type { TrianglePosition } from "../../../hooks";
import { CIRCLE_RADIUS, DEFAULT_CANVAS_SIZE } from "./triangeBoxConstants";

const GRID_SIZE = DEFAULT_CANVAS_SIZE / 6;
const INITIAL_POSITION: TrianglePosition = [
  [DEFAULT_CANVAS_SIZE / 2, GRID_SIZE],
  [GRID_SIZE, DEFAULT_CANVAS_SIZE - GRID_SIZE],
  [DEFAULT_CANVAS_SIZE - GRID_SIZE, DEFAULT_CANVAS_SIZE - GRID_SIZE],
];

export function TriangleBox() {
  const [[A, B, C], pointSetter] = useTriangle(INITIAL_POSITION);

  return (
    <div className="w-screen h-screen grid place-content-center">
      <svg
        viewBox={`0 0 ${DEFAULT_CANVAS_SIZE} ${DEFAULT_CANVAS_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-[${DEFAULT_CANVAS_SIZE}px] h-[${DEFAULT_CANVAS_SIZE}px] border-2 border-dark-grey rounded-md`}
      >
        <DraggableCircle
          radius={CIRCLE_RADIUS}
          posX={A[0]}
          posY={A[1]}
          onPositionChange={pointSetter("a")}
        />
        <DraggableCircle
          radius={CIRCLE_RADIUS}
          posX={B[0]}
          posY={B[1]}
          onPositionChange={pointSetter("b")}
        />
        <DraggableCircle
          radius={CIRCLE_RADIUS}
          posX={C[0]}
          posY={C[1]}
          onPositionChange={pointSetter("c")}
        />

        <Triangle A={A} B={B} C={C} />
      </svg>
    </div>
  );
}

TriangleBox.Circle = DraggableCircle;
