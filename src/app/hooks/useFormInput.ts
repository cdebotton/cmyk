import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useMutationEffect,
  useState,
} from 'react';
import { Schema } from 'yup';

interface HookOptions<T> {
  initialValue: T;
  validate?: Schema<T>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

export interface Field<T> {
  dirty: boolean;
  error: string[] | null;
  onBlur: FormEventHandler<Element>;
  onChange: ChangeEventHandler<{ value: T }>;
  touched: boolean;
  value: T;
  setValue: (value: T) => void;
}

function useFormInput<T>({
  initialValue,
  validate,
  validateOnBlur = true,
  validateOnChange = true,
}: HookOptions<T>): [Field<T>, VoidFunction] {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string[] | null>(null);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  function onChange(event: ChangeEvent<{ value: T }>) {
    setValue(event.currentTarget.value);
  }

  function onBlur() {
    setTouched(true);
    setDirty(true);

    if (validateOnBlur && validate) {
      validate
        .validate(value)
        .then(() => setError(null))
        .catch(({ errors }) => setError(errors));
    }
  }

  useMutationEffect(
    () => {
      if (validateOnChange && validate) {
        validate
          .validate(value)
          .then(() => setError(null))
          .catch(({ errors }) => setError(errors));
      }
    },
    [value],
  );

  function resetValue() {
    setValue(initialValue);
    setError(null);
    setTouched(false);
    setDirty(false);
  }

  const input = {
    dirty,
    error,
    onBlur,
    onChange,
    setValue,
    touched,
    value,
  };

  return [input, resetValue];
}

export default useFormInput;
