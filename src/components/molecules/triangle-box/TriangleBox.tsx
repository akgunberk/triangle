import useTriangle from "../../../hooks/useTriangle";
import { DraggableCircle, Triangle } from "../../atoms";

import type { TrianglePosition } from "../../../hooks";
import { useMemo } from "react";
import { CIRCLE_RADIUS, DEFAULT_CANVAS_SIZE } from "./triangeBoxConstants";

export type TriangleBoxProps = {
  boxSize?: number;
  gridNumber?: number;
};

export function TriangleBox({
  boxSize = DEFAULT_CANVAS_SIZE,
  gridNumber = 6,
}: TriangleBoxProps) {
  const computedInitialPosition = useMemo(() => {
    const gridSize = boxSize / gridNumber;
    const initialPosition: TrianglePosition = [
      [boxSize / 2, gridSize],
      [gridSize, boxSize - gridSize],
      [boxSize - gridSize, boxSize - gridSize],
    ];

    return initialPosition;
  }, [boxSize, gridNumber]);
  const [[A, B, C], pointSetter] = useTriangle(computedInitialPosition);

  return (
    <div className="w-screen h-screen grid place-content-center">
      <svg
        viewBox={`0 0 ${boxSize} ${boxSize}`}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-[${boxSize}px] h-[${boxSize}px] border-2 border-dark-grey rounded-md`}
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
