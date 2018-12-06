import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState, useCallback } from 'react';

import { Schema, ValidationError } from 'yup';

export const CONTROLLER = Symbol();

function isValidationError(x: any): x is ValidationError {
  return x instanceof ValidationError;
}

type BoolShape<T> = {
  readonly [K in keyof T]?: T[K] extends Array<unknown>
    ? boolean[]
    : (T[K] extends object ? BoolShape<T[K]> : boolean)
};

function getBooleanShape<T>(values: T): BoolShape<T> {
  return Object.keys(values).reduce((memo, key) => {
    return Object.assign(memo, { [key]: false });
  }, {});
}

type ErrorShape<T> = {
  readonly [K in keyof T]?: T[K] extends Array<unknown>
    ? string[][]
    : (T[K] extends object ? ErrorShape<T[K]> : string[])
};

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

export interface Form<T> {
  valid: boolean;
  dirty: boolean;
  submitting: boolean;
  handleSubmit: (event: FormEvent) => void | Promise<void>;
  handleReset: VoidFunction;

  [CONTROLLER]: {
    dirty: BoolShape<T>;
    errors: ErrorShape<T>;
    focused: BoolShape<T>;
    touched: BoolShape<T>;
    values: T;
    blur: (name: keyof T) => void;
    change: <K extends keyof T>(name: K, value: T[K]) => void;
    focus: (name: keyof T) => void;
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
  const firstRun = useRef(true);
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [dirty, setDirty] = useState(() => getBooleanShape(initialValues));
  const [focused, setFocused] = useState(() => getBooleanShape(initialValues));
  const [touched, setTouched] = useState(() => getBooleanShape(initialValues));
  const [errors, setErrors] = useState(() => getErrorShape(initialValues));

  function validate() {
    if (validationSchema) {
      try {
        validationSchema.validateSync(values);
        setErrors(getErrorShape(initialValues));
      } catch (err) {
        if (isValidationError(err)) {
          const { path, message } = err;
          setErrors(state => {
            return Object.assign({}, state, { [path]: [message] });
          });
        }
      }
    }
  }

  function change<K extends keyof T>(name: K, value: T[K]) {
    setValues(state => {
      return { ...state, [name]: value };
    });

    setDirty(state => {
      return Object.assign({}, state, { [name]: value !== initialValues[name] });
    });
  }

  function blur<K extends keyof T>(name: K) {
    setTouched(state => {
      return Object.assign({}, state, { [name]: true });
    });
    setFocused(state => {
      return Object.assign({}, state, { [name]: false });
    });
  }

  function focus<K extends keyof T>(name: K) {
    setFocused(state => {
      return Object.assign({}, state, { [name]: true });
    });
  }

  function handleReset() {
    setValues(initialValues);
    setTouched(getBooleanShape(initialValues));
    setDirty(getBooleanShape(initialValues));
    setFocused(getBooleanShape(initialValues));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setSubmitting(true);
    const submit = onSubmit(values);
    if (isPromise(submit)) {
      await submit;
    }
    setSubmitting(false);
  }

  if (firstRun.current === true && validateOnFirstRun) {
    validate();
    firstRun.current = false;
  }

  useEffect(
    () => {
      if (validateOnChange) {
        validate();
      }
    },
    [values],
  );

  useEffect(
    () => {
      if (validateOnBlur) {
        validate();
      }
    },
    [touched],
  );

  const valid = useMemo(
    () => {
      return Object.values(errors).every(err => err === null);
    },
    [errors],
  );

  const isDirty = useMemo(() => Object.values(dirty).some(d => d === true), [dirty]);

  return {
    handleReset,
    handleSubmit,
    submitting,
    valid,
    dirty: isDirty,
    [CONTROLLER]: {
      blur,
      change,
      dirty,
      errors,
      focus,
      focused,
      touched,
      values,
    },
  };
}

function useField<T, K extends keyof T>(
  name: K,
  { [CONTROLLER]: { values, change, blur, focus, dirty, touched, errors, focused } }: Form<T>,
) {
  const input = useMemo(
    () => {
      return {
        onBlur: (_event: FormEvent) => {
          blur(name);
        },
        onChange: (event: ChangeEvent<{ value: T[K] }>) => {
          change(name, event.currentTarget.value);
        },
        onFocus: (_event: FormEvent) => {
          focus(name);
        },
        value: values[name],
      };
    },
    [values[name]],
  );

  const meta = useMemo(
    () => {
      return {
        dirty: dirty[name],
        errors: errors[name],
        focused: focused[name],
        touched: touched[name],
      };
    },
    [dirty[name], touched[name], errors[name], focused[name]],
  );

  const handlers = useMemo(() => {
    return {
      setValue: (value: T[K]) => {
        change(name, value);
      },
    };
  }, []);

  return { input, meta, handlers };
}

export { useForm, useField };
