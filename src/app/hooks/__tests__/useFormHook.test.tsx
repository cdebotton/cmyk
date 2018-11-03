import React from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import * as yup from 'yup';
import useFormHook from '../useFormHook';

function Assert() {
  const { values, touched, handlers, errors } = useFormHook({
    initialValues: {
      foo: 'bar',
    },
    validationSchema: yup.object().shape({
      foo: yup.string().required('required'),
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

  xit('should run validation schema and generate errors', () => {
    const { getByTestId } = render(<Assert />);
    const input = getByTestId('input');

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    fireEvent.blur(input);
    const error = await waitForElement(() => getByTestId('error'));
    // @ts-ignore
    expect(error.innerText).toBe('required');
  });
});
