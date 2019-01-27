import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useCallback,
  FormEventHandler,
  ChangeEventHandler,
  useReducer,
  Dispatch,
} from 'react';

import { Schema, ValidationError } from 'yup';

export const CONTROLLER = Symbol();

function isValidationError(x: any): x is ValidationError {
  return x instanceof ValidationError;
}

interface Options<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnFirstRun?: boolean;
  validationSchema?: Schema<any>;
}

function isPromise(obj: any): obj is Promise<any> {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

type TouchedValues<T> = { [P in keyof T]: T[P] extends object ? TouchedValues<T[P]> : boolean };
type FocusedValues<T> = { [P in keyof T]: T[P] extends object ? FocusedValues<T[P]> : boolean };
type DirtyValues<T> = { [P in keyof T]: T[P] extends object ? DirtyValues<T[P]> : boolean };
type ErrorValues<T> = { [P in keyof T]: T[P] extends object ? ErrorValues<T[P]> : string };

interface State<T extends { [key: string]: any }> {
  draft: T;
  committed: T;
  submitting: boolean;
  validating: boolean;
  touched: Map<string, boolean>;
  focused: Map<string, boolean>;
  dirty: Map<string, boolean>;
  errors: Map<string, string[]>;
}

type Action =
  | { type: 'UPDATE'; payload: { name: string; value: any } }
  | { type: 'FOCUS'; payload: { name: string } }
  | { type: 'BLUR'; payload: { name: string } }
  | { type: 'RESET' }
  | { type: 'VALIDATE_REQUEST' }
  | { type: 'VALIDATE_SUCCESS' }
  | { type: 'VALIDATE_FAILURE'; payload: { errors: Map<string, string[]> } }
  | { type: 'SUBMIT_REQUEST' }
  | { type: 'SUBMIT_SUCCESS' };

function reducer<T, P extends keyof T>(state: State<T>, action: Action): State<T> {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.payload.name]: action.payload.value,
        },
        dirty: state.dirty.get(name) === true ? state.dirty : state.dirty.set(name, true),
      };
    case 'FOCUS':
      return {
        ...state,
        focused: state.focused.set(name, true),
      };
    case 'BLUR':
      return {
        ...state,
        touched: state.touched.get(name) === true ? state.touched : state.touched.set(name, true),
        focused: state.focused.set(name, false),
      };
    case 'RESET':
      return {
        ...state,
        submitting: false,
        draft: state.committed,
        touched: new Map(),
        focused: new Map(),
        dirty: new Map(),
        errors: new Map(),
      };
    case 'VALIDATE_REQUEST':
      return {
        ...state,
        validating: true,
      };
    case 'VALIDATE_SUCCESS':
      return {
        ...state,
        validating: false,
        errors: state.errors.size === 0 ? state.errors : new Map(),
      };
    case 'VALIDATE_FAILURE':
      return {
        ...state,
        validating: false,
        errors: action.payload.errors,
      };
    case 'SUBMIT_REQUEST':
      return {
        ...state,
        submitting: true,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        submitting: false,
        committed: state.draft,
      };
    default:
      return state;
  }
}

export interface Form<T> {
  valid: boolean;
  dirty: boolean;
  submitting: boolean;
  handleSubmit: (event: FormEvent) => void | Promise<void>;
  handleReset: VoidFunction;

  [CONTROLLER]: {
    state: State<T>;
    dispatch: Dispatch<Action>;
  };
}

function useForm<T>({
  initialValues,
  validationSchema,
  onSubmit,
  validateOnBlur = true,
  validateOnChange = true,
  validateOnFirstRun = true,
}: Options<T>): Form<T> {
  const [state, dispatch] = useReducer<State<T>, Action>(reducer, {
    draft: initialValues,
    committed: initialValues,
    validating: false,
    submitting: false,
    touched: new Map(),
    dirty: new Map(),
    focused: new Map(),
    errors: new Map(),
  });

  async function validate() {
    if (validationSchema) {
      try {
        await validationSchema.validate(state.draft);
        dispatch({ type: 'VALIDATE_SUCCESS' });
      } catch (err) {
        if (isValidationError(err)) {
          if (err.inner) {
            dispatch({
              type: 'VALIDATE_FAILURE',
              payload: {
                errors: err.inner.reduce((memo, { path, message }) => {
                  return memo.set(path, message);
                }, new Map()),
              },
            });
          } else {
            const { path, message } = err;
            dispatch({
              type: 'VALIDATE_FAILURE',
              payload: { errors: new Map().set(path, [message]) },
            });
          }
        }
      }
    }
  }

  function handleReset() {
    dispatch({ type: 'RESET' });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    dispatch({ type: 'SUBMIT_REQUEST' });
    const submit = onSubmit(state.draft);

    if (isPromise(submit)) {
      await submit;
    }

    dispatch({ type: 'SUBMIT_SUCCESS' });
  }

  useEffect(() => {
    if (validateOnFirstRun) {
      validate();
    }
  }, []);

  useEffect(
    () => {
      if (validateOnChange) {
        validate();
      }
    },
    [state.draft],
  );

  useEffect(
    () => {
      if (validateOnBlur) {
        validate();
      }
    },
    [state.touched],
  );

  const valid = useMemo(() => state.errors.size === 0, [state.errors]);
  const dirty = useMemo(() => state.dirty.size === 0, [state.dirty]);

  return {
    handleReset,
    handleSubmit,
    valid,
    dirty,
    submitting: state.submitting,
    [CONTROLLER]: {
      state,
      dispatch,
    },
  };
}

interface Field {
  input: {
    onBlur: FormEventHandler;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onFocus: FormEventHandler;
    value: any;
  };
  meta: {
    dirty?: boolean;
    errors?: string[] | null;
    focused?: boolean;
    touched?: boolean;
  };
  handlers: {
    value: any;
    change: (value: any) => void;
    blur: VoidFunction;
    focus: VoidFunction;
  };

  value: any;
  change: (value: any) => void;
  blur: VoidFunction;
  focus: VoidFunction;
}

function useField<T>({ [CONTROLLER]: { state, dispatch } }: Form<T>, name: string): Field {
  const input = useMemo(
    () => {
      return {
        onBlur: (_event: FormEvent) => {
          dispatch({ type: 'BLUR', payload: { name } });
        },
        onChange: (event: ChangeEvent<{ value: any }>) => {
          dispatch({
            type: 'UPDATE',
            payload: { name, value: event.currentTarget.value },
          });
        },
        onFocus: (_event: FormEvent) => {
          dispatch({ type: 'FOCUS', payload: { name } });
        },
        value: state.draft[name],
      };
    },
    [state],
  );

  const meta = useMemo(
    () => {
      return {
        dirty: state.dirty.get(name),
        errors: state.errors.get(name),
        focused: state.focused.get(name),
        touched: state.touched.get(name),
      };
    },
    [
      state.dirty.get(name),
      state.touched.get(name),
      state.errors.get(name),
      state.focused.get(name),
    ],
  );

  const handlers = {
    value: state.draft[name],
    change: useCallback(
      (value: any) => {
        dispatch({ type: 'UPDATE', payload: { name, value } });
      },
      [name, dispatch],
    ),
    blur: useCallback(
      () => {
        dispatch({ type: 'BLUR', payload: { name } });
      },
      [name, dispatch],
    ),
    focus: useCallback(
      () => {
        dispatch({ type: 'FOCUS', payload: { name } });
      },
      [name, dispatch],
    ),
  };

  return { ...handlers, handlers, input, meta };
}

export { useForm, useField };
