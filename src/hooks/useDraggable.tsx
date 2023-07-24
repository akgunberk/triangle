import { useState, useEffect, useCallback, useRef } from "react";
import type { DependencyList, RefObject } from "react";

import { Position2D } from "./useTriangle";
import { NO_OP } from "../utils";

type useDraggableEvents = {
  onPointerDown?: (event: PointerEvent) => void;
  onPointerUp?: (event: PointerEvent) => void;
  onPointerMove?: (event: PointerEvent) => void;
  onDrag?: (position: Position2D) => void;
};

const useDraggable = <T extends Element>(
  events: useDraggableEvents,
  deps?: DependencyList
): [RefObject<T>, { isDragging: boolean }] => {
  const {
    onPointerDown = NO_OP,
    onPointerUp = NO_OP,
    onPointerMove = NO_OP,
    onDrag = NO_OP,
  } = events;
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      setIsDragging(true);

      onPointerDown(e);
    },
    [onPointerDown]
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent) => {
      setIsDragging(false);

      onPointerUp(e);
    },

    [onPointerUp]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging && ref.current) {
        // for making boundary
        if (e.pageX === e.offsetX || e.pageY === e.offsetY) {
          setIsDragging(false);
          return;
        }
        onPointerMove(e);

        onDrag([e.offsetX, e.offsetY]);
      }
    },
    [isDragging, onDrag, onPointerMove]
  );

  useEffect(() => {
    const element = ref.current as unknown as HTMLElement;
    if (element) {
      element.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        element.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), handlePointerDown, handlePointerMove, handlePointerUp]);

  return [ref, { isDragging }];
};

export default useDraggable;
