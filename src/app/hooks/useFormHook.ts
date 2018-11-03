import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useMemo,
  useState,
} from 'react';
import { Schema } from 'yup';

interface Options<T> {
  initialValues: T;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validationSchema?: any;
}

type BoolShape<T> = { readonly [K in keyof T]?: boolean };
type ErrorShape<T> = { readonly [K in keyof T]?: string };

type Handlers<T> = {
  readonly [K in keyof T]: {
    onChange: ChangeEventHandler<FormElement>;
    onBlur: FormEventHandler<FormElement>;
  }
};

interface Form<T> {
  values: T;
  errors: ErrorShape<T>;
  touched: BoolShape<T>;
  handlers: Handlers<T>;
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
  const [errors, setErrors] = useState<ErrorShape<T>>({});

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

              if (validationSchema && validateOnBlur) {
                try {
                  validationSchema.validateSync(values);
                } catch (yupError) {
                  setErrors(prevErrors => {
                    return setErrorsFromYup(prevErrors, yupError);
                  });
                }
              }
            },
            onChange: (event: ChangeEvent<FormElement>) => {
              const { currentTarget } = event;
              setValues(prevState => {
                return {
                  ...(prevState as any),
                  [key]: currentTarget.value,
                };
              });

              if (validationSchema && validateOnChange) {
                try {
                  validationSchema.validateSync(values);
                } catch (yupError) {
                  setErrors(prevErrors => {
                    return setErrorsFromYup(prevErrors, yupError);
                  });
                }
              }
            },
          },
        };
      }, {});
    },
    [initialValues],
  );

  return { values, touched, handlers, errors };
}

function setErrorsFromYup<T>(_: ErrorShape<T>, yupError: any): ErrorShape<T> {
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
