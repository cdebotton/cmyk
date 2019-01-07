import { useReducer, ChangeEvent, FormEvent, Dispatch } from 'react';

type State<T> = {
  value: T;
  dirty: boolean;
  touched: boolean;
  focused: boolean;
};

type Action<T> = { type: 'change'; payload: { value: T } } | { type: 'focus' } | { type: 'blur' };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'change': {
      const { value } = action.payload;
      return { ...state, value, dirty: true };
    }
    case 'focus':
      return { ...state, focused: true };
    case 'blur':
      return { ...state, focused: false, touched: true };
  }
}
type HandleMapper<T, U> = (state: State<T>, dispatch: Dispatch<Action<T>>) => U;

function mapDefaultHandler<T>(state: State<T>, dispatch: Dispatch<Action<T>>) {
  return {
    value: state.value,
    onChange: (event: ChangeEvent<{ value: T }>) => {
      dispatch({ type: 'change', payload: { value: event.currentTarget.value } });
    },
    onFocus: (_event: FormEvent<HTMLInputElement>) => {
      dispatch({ type: 'focus' });
    },
    onBlur: (_event: FormEvent<HTMLInputElement>) => {
      dispatch({ type: 'blur' });
    },
  };
}

function useInput<T, F extends HandleMapper<T, any>>(
  initialValue: T,
  mapToHandler: F,
): ReturnType<F> {
  const [state, dispatch] = useReducer<State<T>, Action<T>>(reducer, {
    value: initialValue,
    dirty: false,
    focused: false,
    touched: false,
  });

  return mapToHandler(state, dispatch);
}

export { useInput, mapDefaultHandler };
