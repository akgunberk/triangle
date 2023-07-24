import { useState } from "react";

export type Position2D = [number, number];

export type TrianglePosition = [Position2D, Position2D, Position2D];

const useTriangle = (
  position: TrianglePosition
): [
    TrianglePosition,
    (corner: "a" | "b" | "c") => (position: TrianglePosition[number]) => void
  ] => {
  const [positionA, setA] = useState<[number, number]>(position[0]);
  const [positionB, setB] = useState<[number, number]>(position[1]);
  const [positionC, setC] = useState<[number, number]>(position[2]);

  return [
    [positionA, positionB, positionC],
    (corner: "a" | "b" | "c") => (position: [number, number]) => {
      let setter:
        | React.Dispatch<React.SetStateAction<[number, number]>>
        | undefined;
      switch (corner) {
        case "a":
          setter = setA;
          break;

        case "b":
          setter = setB;
          break;

        case "c":
          setter = setC;
          break;

        default:
          break;
      }

      if (setter) setter(position);
    },
  ];
};

export default useTriangle;
