import { useReducer, useCallback, Dispatch } from 'react';
import { State, Action, reducer } from './state';
import { getIn } from './utils';

type Options<Values> = {
  initialValues: Values;
};

type Dispatcher<T> = Dispatch<Action<T>>;
type Getter = (
  path: string,
) => {
  dirty: boolean;
  touched: boolean;
  focused: boolean;
  value: any;
};

export function useForm<Values>({ initialValues }: Options<Values>): [Getter, Dispatcher<Values>] {
  const [state, dispatch] = useReducer<State<Values> | undefined, Action<Values>>(
    reducer,
    undefined,
    { type: '@@INIT_ACTION', payload: initialValues },
  );

  if (state === undefined) {
    throw new Error('Form state was not properly initialized');
  }

  const get = useCallback(
    (path: string) => {
      const dirty = getIn(state.dirty, path);
      const touched = getIn(state.touched, path);
      const value = getIn(state.values, path);
      const focused = getIn(state.focused, path);

      return { dirty, touched, value, focused };
    },
    [state],
  );

  return [get, dispatch];
}
