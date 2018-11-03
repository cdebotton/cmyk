import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useMemo,
  useMutationEffect,
  useState,
} from 'react';
import { Schema } from 'yup';

interface Options<T> {
  initialValues: T;
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

interface Form<T> {
  values: T;
  errors: StringShape<T>;
  touched: BoolShape<T>;
  dirty: BoolShape<T>;
  handlers: Handlers<T>;
  valid: boolean;
}

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function useFormHook<T>({
  initialValues,
  validateOnBlur = true,
  validateOnChange = true,
  validationSchema,
}: Options<T>): Form<T> {
  const [values, setValues] = useState(initialValues);
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

  useMutationEffect(
    () => {
      if (validationSchema && validateOnChange) {
        validateValues(values, validationSchema);
      }
    },
    [values],
  );

  useMutationEffect(
    () => {
      if (validationSchema && validateOnBlur) {
        validateValues(values, validationSchema);
      }
    },
    [touched],
  );

  useMutationEffect(
    () => {
      const isValid = Object.keys(errors).length === 0;
      setValid(isValid);
    },
    [errors],
  );

  return { values, touched, handlers, errors, valid, dirty };
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
