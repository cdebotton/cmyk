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

interface State<T extends { [key: string]: any }> {
  draft: T;
  committed: T;
  submitting: boolean;
  validating: boolean;
  touched: Map<keyof T, boolean>;
  focused: Map<keyof T, boolean>;
  dirty: Map<keyof T, boolean>;
  errors: Map<keyof T, string[]>;
}

enum ActionType {
  update,
  focus,
  blur,
  reset,
  validateRequest,
  validateSuccess,
  validateFalure,
  submitRequest,
  submitSuccess,
  submitFailure,
}

type Action<T, P extends keyof T> =
  | { type: ActionType.update; payload: { name: P; value: T[P] } }
  | { type: ActionType.focus; payload: { name: P } }
  | { type: ActionType.blur; payload: { name: P } }
  | { type: ActionType.reset }
  | { type: ActionType.validateRequest }
  | { type: ActionType.validateSuccess }
  | { type: ActionType.validateFalure; payload: { errors: Map<P, string[]> } }
  | { type: ActionType.submitRequest }
  | { type: ActionType.submitSuccess };

function reducer<T, P extends keyof T>(state: State<T>, action: Action<T, P>): State<T> {
  switch (action.type) {
    case ActionType.update:
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.payload.name]: action.payload.value,
        },
        dirty: state.dirty.get(name) === true ? state.dirty : state.dirty.set(name, true),
      };
    case ActionType.focus:
      return {
        ...state,
        focused: state.focused.set(name, true),
      };
    case ActionType.blur:
      return {
        ...state,
        touched: state.touched.get(name) === true ? state.touched : state.touched.set(name, true),
        focused: state.focused.set(name, false),
      };
    case ActionType.reset:
      return {
        ...state,
        submitting: false,
        draft: state.committed,
        touched: new Map(),
        focused: new Map(),
        dirty: new Map(),
        errors: new Map(),
      };
    case ActionType.validateRequest:
      return {
        ...state,
        validating: true,
      };
    case ActionType.validateSuccess:
      return {
        ...state,
        validating: false,
        errors: state.errors.size === 0 ? state.errors : new Map(),
      };
    case ActionType.validateFalure:
      return {
        ...state,
        validating: false,
        errors: action.payload.errors,
      };
    case ActionType.submitRequest:
      return {
        ...state,
        submitting: true,
      };
    case ActionType.submitSuccess:
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
    dispatch: Dispatch<Action<T, keyof T>>;
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
  const [state, dispatch] = useReducer<State<T>, Action<T, keyof T>>(reducer, {
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
        dispatch({ type: ActionType.validateSuccess });
      } catch (err) {
        if (isValidationError(err)) {
          if (err.inner) {
            dispatch({
              type: ActionType.validateFalure,
              payload: {
                errors: err.inner.reduce((memo, { path, message }) => {
                  return memo.set(path, message);
                }, new Map()),
              },
            });
          } else {
            const { path, message } = err;
            dispatch({
              type: ActionType.validateFalure,
              payload: { errors: new Map().set(path, [message]) },
            });
          }
        }
      }
    }
  }

  function handleReset() {
    dispatch({ type: ActionType.reset });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    dispatch({ type: ActionType.submitRequest });
    const submit = onSubmit(state.draft);

    if (isPromise(submit)) {
      await submit;
    }

    dispatch({ type: ActionType.submitSuccess });
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

interface Field<T> {
  input: {
    onBlur: FormEventHandler;
    onChange: ChangeEventHandler<{ value: T }>;
    onFocus: FormEventHandler;
    value: T;
  };
  meta: {
    dirty?: boolean;
    errors?: string[] | null;
    focused?: boolean;
    touched?: boolean;
  };
  handlers: {
    value: T;
    change: (value: T) => void;
    blur: VoidFunction;
    focus: VoidFunction;
  };

  value: T;
  change: (value: T) => void;
  blur: VoidFunction;
  focus: VoidFunction;
}

function useField<T, K extends keyof T>(
  { [CONTROLLER]: { state, dispatch } }: Form<T>,
  name: K,
): Field<T[K]> {
  const input = useMemo(
    () => {
      return {
        onBlur: (_event: FormEvent) => {
          dispatch({ type: ActionType.blur, payload: { name } });
        },
        onChange: (event: ChangeEvent<{ value: T[K] }>) => {
          dispatch({
            type: ActionType.update,
            payload: { name, value: event.currentTarget.value },
          });
        },
        onFocus: (_event: FormEvent) => {
          dispatch({ type: ActionType.focus, payload: { name } });
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
      (value: T[K]) => {
        dispatch({ type: ActionType.update, payload: { name, value } });
      },
      [name, dispatch],
    ),
    blur: useCallback(
      () => {
        dispatch({ type: ActionType.blur, payload: { name } });
      },
      [name, dispatch],
    ),
    focus: useCallback(
      () => {
        dispatch({ type: ActionType.focus, payload: { name } });
      },
      [name, dispatch],
    ),
  };

  return { ...handlers, handlers, input, meta };
}

export { useForm, useField };
