import { ChangeEvent, FormEvent, useReducer } from 'react';

interface Change<T> {
  type: 'CHANGE';
  payload: T;
}

interface Focus {
  type: 'FOCUS';
}

interface Blur {
  type: 'BLUR';
}

type Action<T> = Change<T> | Focus | Blur;

interface State<T> {
  dirty: boolean;
  error: string | null;
  focused: boolean;
  touched: boolean;
  value: T;
}

function useFormInput<T>(
  initialValue: T,
  validate: (value: T) => string | null = () => null,
) {
  function reducer(state: State<T>, action: Action<T>) {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          dirty: true,
          error: validate(action.payload),
          value: action.payload,
        };
      case 'FOCUS':
        return {
          ...state,
          focused: true,
        };
      case 'BLUR':
        return {
          ...state,
          focused: false,
          touched: true,
        };
      default:
        return state;
    }
  }

  const [{ dirty, error, touched, focused, value }, dispatch] = useReducer(
    reducer,
    {
      dirty: false,
      error: null,
      focused: false,
      touched: false,
      value: initialValue,
    },
  );

  return {
    value,
    onChange(event: ChangeEvent<{ value: T }>) {
      dispatch({
        payload: event.currentTarget.value,
        type: 'CHANGE',
      });
    },
    onFocus(_event: FormEvent<HTMLElement>) {
      dispatch({
        type: 'FOCUS',
      });
    },
    onBlur(_event: FormEvent<HTMLElement>) {
      dispatch({
        type: 'BLUR',
      });
    },
  };
}

export default useFormInput;
