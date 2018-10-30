import { ChangeEvent, useMutationEffect, useState } from 'react';
import { Schema } from 'yup';

interface HookOptions<T> {
  initialValue: T;
  validate?: Schema<T>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
}

function useFormInput<T>({
  initialValue,
  validate,
  validateOnBlur = true,
  validateOnChange = true,
}: HookOptions<T>) {
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

  return {
    dirty,
    error,
    onBlur,
    onChange,
    touched,
    value,
  };
}

export default useFormInput;
