import React, { SFC, ReactNode } from 'react';
import Reducer, { ReducerFn, DispatcherFn } from './Reducer';

type ReducerState = { isHovering: boolean; isFocused: boolean };
type ReducerAction =
  | { type: 'SET_FOCUS'; payload: boolean }
  | { type: 'SET_HOVER'; payload: boolean };

const reducer: ReducerFn<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'SET_FOCUS':
      return { ...state, isFocused: action.payload };
    case 'SET_HOVER':
      return { ...state, isHovering: action.payload };
    default:
      return state;
  }
};

type FieldContext = {
  value: ReducerState;
  dispatch: DispatcherFn<ReducerAction>;
};

type Props = {
  children: (props: FieldContext) => ReactNode;
};

const FieldState: SFC<Props> = ({ children }) => (
  <Reducer
    reducer={reducer}
    initialValue={{ isHovering: false, isFocused: false }}
  >
    {state => children(state)}
  </Reducer>
);

export default FieldState;
