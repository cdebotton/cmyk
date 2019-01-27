import { useReducer } from 'react';
import { State, Action } from './state';
import { useForm } from '.';

type Props<Values> = {
  initialValues: Values;
};

function Form<T>(props: Props<T>) {
  const [getField, dispatch] = useForm(props);
}
