import React, {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  FormEvent,
  useCallback,
} from 'react';
import { State, Action, reducer } from './state';
import { Schema } from 'yup';

type Options<Values> = {
  initialValues: Values;
  validationSchema?: Schema<Values>;
  validateOnChange?: boolean;
  validateOnFirstRun?: boolean;
};

export const FormDispatch = createContext<Dispatch<Action<any>> | null>(null);
export const FormReader = createContext<State<any> | null>(null);

export function useForm<Values>({
  initialValues,
  validationSchema,
  validateOnChange = true,
  validateOnFirstRun = true,
}: Options<Values>): [State<Values>, Dispatch<Action<Values>>] {
  const [state, dispatch] = useReducer<State<Values> | undefined, Action<Values>>(
    reducer,
    undefined,
    { type: '@@INIT_ACTION', payload: initialValues },
  );

  if (state === undefined) {
    throw new Error('Form state was not properly initialized');
  }

  useEffect(() => {
    if (validateOnFirstRun) {
    }
  }, []);

  useEffect(() => {
    if (validateOnChange) {
    }
  }, [state.values]);

  return [state, dispatch];
}

type FormProps<T> = Pick<Options<T>, Exclude<keyof Options<T>, 'initialValues'>> & {
  children: ReactNode;
  className?: string;
  state: State<T>;
  dispatch: Dispatch<Action<T>>;
  onSubmit: (values: T) => void | Promise<void>;
};

export function FormProvider<T>({ children, className, onSubmit, state, dispatch }: FormProps<T>) {
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      onSubmit(state.values);
    },
    [state.values],
  );

  return (
    <FormDispatch.Provider value={dispatch}>
      <FormReader.Provider value={state}>
        <form className={className} onSubmit={handleSubmit}>
          {children}
        </form>
      </FormReader.Provider>
    </FormDispatch.Provider>
  );
}
