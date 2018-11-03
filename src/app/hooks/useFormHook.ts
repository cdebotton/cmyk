import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { Schema } from 'yup';

interface Options<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<any>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validationSchema?: Schema<any>;
}

type BoolShape<T> = { readonly [K in keyof T]?: boolean };
type StringShape<T> = { readonly [K in keyof T]?: string };

type Handlers<T> = {
  readonly [K in keyof T]: {
    onChange: ChangeEventHandler<FormElement>;
    onBlur: FormEventHandler<FormElement>;
  }
};

type Setters<T> = { readonly [K in keyof T]: (value: T[K]) => void };

interface Form<T> {
  values: T;
  errors: StringShape<T>;
  touched: BoolShape<T>;
  dirty: BoolShape<T>;
  handlers: Handlers<T>;
  setters: Setters<T>;
  valid: boolean;
  submitting: boolean;
  handleReset: VoidFunction;
  handleSubmit: FormEventHandler<HTMLFormElement>;
}

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function useFormHook<T>({
  initialValues,
  onSubmit,
  validateOnBlur = true,
  validateOnChange = true,
  validationSchema,
}: Options<T>): Form<T> {
  const [lastValues, setLastValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState(lastValues);
  const [touched, setTouched] = useState<BoolShape<T>>({});
  const [dirty, setDirty] = useState<BoolShape<T>>({});
  const [errors, setErrors] = useState<StringShape<T>>({});
  const [valid, setValid] = useState(true);

  function validateValues(val: T, schema: Schema<any>) {
    try {
      schema.validateSync(val);
      setErrors({});
    } catch (yupError) {
      setErrors(prevErrors => {
        return setErrorsFromYup(prevErrors, yupError);
      });
    }
  }

  const handlers = useMemo<Handlers<T>>(
    () => {
      return Object.keys(values).reduce((memo, key) => {
        return {
          ...(memo as any),
          [key]: {
            onBlur: (_: FormEvent<FormElement>) => {
              setTouched(prevState => {
                return Object.assign({}, prevState, { [key]: true });
              });
            },
            onChange: (event: ChangeEvent<FormElement>) => {
              const { currentTarget } = event;

              setValues(prevState => {
                return {
                  ...(prevState as any),
                  [key]: currentTarget.value,
                };
              });

              setDirty(prevState => {
                return {
                  ...(prevState as any),
                  [key]: true,
                };
              });
            },
          },
        };
      }, {});
    },
    [initialValues],
  );

  const setters = useMemo<Setters<T>>(
    () => {
      return Object.keys(initialValues).reduce<Setters<T>>(
        (memo, key) => {
          return {
            ...(memo as any),
            [key]: <K extends keyof T>(value: T[K]) => {
              setValues(prevValues => {
                return {
                  ...(values as any),
                  [key]: value,
                };
              });
            },
          };
        },
        {} as any,
      );
    },
    [initialValues],
  );

  useEffect(
    () => {
      if (validationSchema && validateOnChange) {
        validateValues(values, validationSchema);
      }
    },
    [values],
  );

  useEffect(
    () => {
      if (validationSchema && validateOnBlur) {
        validateValues(values, validationSchema);
      }
    },
    [touched],
  );

  useEffect(
    () => {
      const isValid = Object.keys(errors).length === 0;
      setValid(isValid);
    },
    [errors],
  );

  function handleReset() {
    setValues(lastValues);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!valid) {
      return;
    }

    setSubmitting(true);
    await onSubmit(values);
    setSubmitting(false);
    setLastValues(values);
  }

  return {
    dirty,
    errors,
    handleReset,
    handleSubmit,
    handlers,
    setters,
    submitting,
    touched,
    valid,
    values,
  };
}

function setErrorsFromYup<T>(_: StringShape<T>, yupError: any): StringShape<T> {
  if (yupError.inner.length === 0) {
    return { [yupError.path]: yupError.message } as any;
  }

  const newErrors = {};
  for (const err of yupError.inner) {
    Object.assign(newErrors, {
      [err.path]: err.message,
    });
  }
  return newErrors;
}

export default useFormHook;
