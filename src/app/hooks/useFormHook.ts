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
  initialValues: any;
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
            onBlur: async (_: FormEvent<FormElement>) => {
              setTouched(prevState => {
                return Object.assign({}, prevState, { [key]: true });
              });

              // if (validationSchema && validateOnBlur) {
              //   Promise.resolve(
              //     validationSchema ? validationSchema.validate(values) : {},
              //   )
              //     .then(x => x, e => e)
              //     .then(e => {
              //       console.log(e, '!!!');
              //       setErrors(e);
              //     });
              // }
            },
            onChange: (event: ChangeEvent<FormElement>) => {
              const { currentTarget } = event;
              setValues(prevState => {
                return {
                  ...(prevState as any),
                  [key]: currentTarget.value,
                };
              });
            },
          },
        };
      }, {});
    },
    [initialValues],
  );

  return { values, touched, handlers, errors };
}

export default useFormHook;
