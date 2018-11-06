import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

export interface FormInput<T> {
  input: {
    value: T;
    onChange: ChangeEvent;
    onBlur: FormEvent;
    onFocus: FormEvent;
  };
  meta: {
    dirty: boolean;
    touched: boolean;
    focused: boolean;
  };
}

function useInput<T>(initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [dirty, setDirty] = useState(false);

  const input = useMemo(
    () => {
      return {
        value,
        onBlur: (_event: FormEvent) => {
          setTouched(true);
          setFocused(false);
        },
        onChange: (event: ChangeEvent<any>) => {
          setValue(event.currentTarget.value);
          setDirty(true);
        },
        onFocus: (_event: FormEvent) => {
          setFocused(true);
        },
      };
    },
    [value],
  );

  const meta = useMemo(
    () => {
      return { focused, touched, dirty };
    },
    [focused, touched, dirty],
  );

  return {
    input,
    meta,
  };
}

export default useInput;
