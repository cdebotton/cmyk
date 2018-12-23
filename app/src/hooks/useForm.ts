import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  FormEventHandler,
  ChangeEventHandler,
  useReducer,
  Dispatch,
} from 'react';

import { Schema, ValidationError, number } from 'yup';

export const CONTROLLER = Symbol();

function isValidationError(x: any): x is ValidationError {
  return x instanceof ValidationError;
}

type BoolShape<T> = { readonly [K in keyof T]?: boolean };

function getBooleanShape<T>(values: T): BoolShape<T> {
  return Object.keys(values).reduce((memo, key) => {
    return Object.assign(memo, { [key]: false });
  }, {});
}

type ErrorShape<T> = { readonly [K in keyof T]?: string[] };

function getErrorShape<T>(values: T): ErrorShape<T> {
  return Object.keys(values).reduce((memo, key) => {
    return { ...memo, [key]: null };
  }, {});
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

interface State<T> {
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
          const { path, message } = err;
          const errors = new Map().set(path, [message]);
          dispatch({ type: ActionType.validateFalure, payload: { errors } });
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

const arrayHelpers = {
  push: <T>(field: Field<T[]>, value: T) => {
    field.change([...field.input.value, value]);
  },
  remove: <T>(field: Field<T[]>, index: number): T => {
    const shallowCopy = [...field.input.value];
    const [deletedItem] = shallowCopy.splice(index);
    field.change(shallowCopy);
    return deletedItem;
  },
  update: <T>(field: Field<T[]>, index: number, value: T) => {
    field.change(
      field.value.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return { ...item, ...value };
      }),
    );
  },
};

export { useForm, useField, arrayHelpers };
