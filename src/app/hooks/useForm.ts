import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Schema, ValidationError } from 'yup';

function isValidationError(x: any): x is ValidationError {
  return x instanceof ValidationError;
}

type BoolShape<T> = { readonly [K in keyof T]?: boolean };

function getBooleanShape<T>(values: T): BoolShape<T> {
  return Object.keys(values).reduce((memo, key) => {
    return Object.assign(memo, { [key]: false });
  }, {});
}

type ErrorShape<T> = { readonly [K in keyof T]?: string[] | null };

function getErrorShape<T>(values: T): ErrorShape<T> {
  return Object.keys(values).reduce((memo, key) => {
    return Object.assign(memo, { [key]: null });
  }, {});
}

interface Options<T> {
  initialValues: T;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnFirstRun?: boolean;
  validationSchema?: Schema<T>;
}

export interface Form<T> {
  dirty: BoolShape<T>;
  errors: ErrorShape<T>;
  focus: (name: keyof T) => void;
  focused: BoolShape<T>;
  blur: (name: keyof T) => void;
  touched: BoolShape<T>;
  change: <K extends keyof T>(name: K, value: T[K]) => void;
  values: T;
  valid: boolean;
}

function useForm<T>({
  initialValues,
  validationSchema,
  // validateOnBlur = true,
  validateOnChange = true,
  validateOnFirstRun = true,
}: Options<T>): Form<T> {
  const firstRun = useRef(true);
  const [values, setValues] = useState(initialValues);

  const [dirty, setDirty] = useState<BoolShape<T>>(
    getBooleanShape(initialValues),
  );

  const [focused, setFocused] = useState<BoolShape<T>>(
    getBooleanShape(initialValues),
  );

  const [touched, setTouched] = useState<BoolShape<T>>(
    getBooleanShape(initialValues),
  );

  const [errors, setErrors] = useState<ErrorShape<T>>(
    getErrorShape(initialValues),
  );

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
      return Object.assign({}, state, { [name]: value });
    });

    setDirty(state => {
      return Object.assign({}, state, {
        [name]: value !== initialValues[name],
      });
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

  const valid = useMemo(
    () => {
      return Object.values(errors).every(err => err === null);
    },
    [errors],
  );

  return {
    blur,
    change,
    dirty,
    errors,
    focus,
    focused,
    touched,
    valid,
    values,
  };
}

function useField<T, K extends keyof T>(
  name: K,
  { values, change, blur, focus }: Form<T>,
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

  return { input };
}

export { useForm, useField };
