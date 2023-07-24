import { Position2D } from "../../../hooks/useTriangle";

export type TriangleProps = {
  A: Position2D;
  B: Position2D;
  C: Position2D;
};

export function Triangle(props: TriangleProps) {
  const points = Object.values(props)
    .map((corner) => corner.join(","))
    .join(" ");

  return (
    <polygon className="fill-none stroke-1 stroke-light-blue" points={points} />
  );
}
