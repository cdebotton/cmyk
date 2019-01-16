import { useState, useCallback, ChangeEvent } from 'react';

type HandleChange<T> = (event: ChangeEvent<{ value: T }>) => void;
type HandleFormEvent = () => void;

type Field<T> = {
  value: T;
  focused: boolean;
  dirty: boolean;
  touched: boolean;
  errors: string[] | null;
  onChange: HandleChange<T>;
  onBlur: HandleFormEvent;
};

type Getter<T> = () => T;
type Setter<T> = (value: T) => void;

function useInput<T>(getValue: Getter<T>, setValue: Setter<T>): Field<T> {
  const [focused, setFocused] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [touched, setTouched] = useState(false);
  const errors = null;

  const onChange = useCallback((event: ChangeEvent<{ value: T }>) => {
    setValue(event.currentTarget.value);
    setDirty(event.currentTarget.value !== getValue());
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    setTouched(false);
  }, []);

  return { value: getValue(), onChange, onBlur, focused, dirty, touched, errors };
}

export default useInput;
