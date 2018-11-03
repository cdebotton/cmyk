import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import * as yup from 'yup';
import useFormHook from '../useFormHook';

interface Props {
  initialValue?: string;
}

function Assert({ initialValue = 'bar' }: Props) {
  const { values, touched, handlers, errors } = useFormHook({
    initialValues: {
      foo: initialValue,
    },
    validationSchema: yup.object().shape({
      foo: yup
        .string()
        .required('required')
        .email('email'),
    }),
  });

  return (
    <form>
      <input data-testid="input" value={values.foo} {...handlers.foo} />
      {touched.foo && <span data-testid="touched" />}
      {errors.foo && <span data-testid="error">{errors.foo}</span>}
    </form>
  );
}

describe('useFormHook()', () => {
  test('it should create a bound field', () => {
    const { getByTestId, queryByTestId } = render(<Assert />);
    const input = getByTestId('input');
    // @ts-ignore
    let touched = queryByTestId(/touched/i);

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    expect(input.value).toBe('bar');
    expect(touched).toBeNull();

    fireEvent.change(input, { target: { value: 'baz' } });
    expect(input.value).toBe('baz');
    fireEvent.blur(input);

    // @ts-ignore
    touched = queryByTestId(/touched/i);
    expect(touched).not.toBeNull();
  });

  it('should run validation schema and generate errors', async () => {
    const { getByTestId } = render(<Assert initialValue="" />);
    const input = getByTestId('input');

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    fireEvent.blur(input);

    const error = getByTestId('error');
    // @ts-ignore
    expect(error).toHaveTextContent('required');
    fireEvent.change(input, { target: { value: 'admin' } });
    // @ts-ignore
    expect(error).toHaveTextContent('email');
  });
});
