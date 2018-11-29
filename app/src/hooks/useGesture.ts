import { useState, useRef, useMemo } from 'react';

type Point = [number, number];

interface State {
  initial: Point;
  position: Point;
  previousPosition: Point;
  delta: Point;
  velocity: Point;
  down: boolean;
}

interface Options {
  transient?: boolean;
  onAction?: (props: State) => void;
}

const initialState: State = {
  initial: [0, 0],
  position: [0, 0],
  previousPosition: [0, 0],
  delta: [0, 0],
  velocity: [0, 0],
  down: false,
};

type DownEventValues = {
  pageX: number;
  pageY: number;
};

type MoveEventValues = DownEventValues & {
  movementX?: number;
  movementY?: number;
};

type Setter = (callack: (state: State) => State) => void;

function createHandlers(set: Setter, { onAction }: Options) {
  const handleUp = () =>
    set(state => {
      const nextState = { ...state, down: false };

      if (onAction) {
        onAction(nextState);
      }

      return nextState;
    });

  const handleDown = ({ pageX, pageY }: DownEventValues) =>
    set(state => {
      const nextState: State = {
        ...state,
        position: [pageX, pageY],
        delta: [0, 0],
        velocity: [0, 0],
        initial: [pageX, pageY],
        previousPosition: [pageX, pageY],
        down: true,
      };

      if (onAction) {
        onAction(nextState);
      }

      return nextState;
    });

  const handleMove = ({ pageX, pageY, movementX = 0, movementY = 0 }: MoveEventValues) =>
    set(state => {
      const nextState: State = {
        ...state,
        position: [pageX, pageY],
        delta: [pageX - state.initial[0], pageY - state.initial[1]],
        previousPosition: [state.position[0], state.position[1]],
        velocity: [movementX, movementY],
      };

      if (onAction) {
        onAction(nextState);
      }

      return nextState;
    });

  const handleTouchStart = (event: TouchEvent) => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    handleDown(event.touches[0]);
  };

  const handleTouchMove = (event: TouchEvent) => handleMove(event.touches[0]);

  const handleTouchEnd = () => {
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
    handleUp();
  };

  const handleMouseDown = (event: MouseEvent) => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    handleDown(event);
  };

  const handleMouseMove = (event: MouseEvent) => handleMove(event);

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    handleUp();
  };

  return {
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  };
}

function useGesture(options: Options = {}): [any, State] {
  const [state, setState] = useState(initialState);
  const transientState = useRef(initialState);
  const handlers = useMemo(
    () => {
      if (options.transient) {
        return createHandlers(cb => (transientState.current = cb(transientState.current)), options);
      }

      return createHandlers(setState, options);
    },
    [options.transient, transientState.current],
  );

  return [handlers, state];
}

export default useGesture;
