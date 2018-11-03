import React from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';
import * as yup from 'yup';
import useFormHook from '../useFormHook';

interface Props {
  initialValue?: string;
}

function Assert({ initialValue = 'bar' }: Props) {
  const {
    values,
    touched,
    handlers,
    errors,
    dirty,
    valid,
    handleSubmit,
    submitting,
  } = useFormHook({
    initialValues: {
      foo: initialValue,
    },
    onSubmit: () => undefined,
    validationSchema: yup.object().shape({
      foo: yup
        .string()
        .email('email')
        .required('required'),
    }),
  });

  return (
    <form onSubmit={handleSubmit}>
      <input data-testid="input" value={values.foo} {...handlers.foo} />
      {touched.foo && <span data-testid="touched" />}
      {dirty.foo && <span data-testid="dirty" />}
      {errors.foo && <span data-testid="error">{errors.foo}</span>}
      {submitting && <span data-testid="submitting" />}
      <button data-testid="button" type="submit" disabled={!valid}>
        Go
      </button>
    </form>
  );
}

describe('useFormHook()', () => {
  test('it should create a bound field', () => {
    const { getByTestId, queryByTestId } = render(<Assert />);
    const input = getByTestId('input');

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    expect(input.value).toBe('bar');

    fireEvent.change(input, { target: { value: 'baz' } });

    expect(input.value).toBe('baz');

    fireEvent.blur(input);
  });

  it('should expose dirty fields', () => {
    const { getByTestId, queryByTestId } = render(<Assert />);
    const input = getByTestId('input');
    // @ts-ignore
    let dirty = queryByTestId(/dirty/i);

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    expect(dirty).toBeNull();

    fireEvent.change(input, { target: { value: 'baz' } });
    // @ts-ignore
    dirty = queryByTestId(/dirty/i);

    expect(dirty).not.toBeNull();
  });

  it('should expose touched fields', () => {
    const ui = <Assert />;
    const { getByTestId, queryByTestId, rerender } = render(ui);
    const input = getByTestId('input');
    // @ts-ignore
    let touched = queryByTestId(/touched/i);

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    expect(input.value).toBe('bar');
    expect(touched).toBeNull();

    fireEvent.blur(input);

    rerender(ui);
    // @ts-ignore
    touched = queryByTestId(/touched/i);
    expect(touched).not.toBeNull();
  });

  it('should run validation schema and generate errors', async () => {
    const ui = <Assert initialValue="" />;
    const { getByTestId, rerender } = render(ui);
    const input = getByTestId('input');

    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    fireEvent.blur(input);

    rerender(ui);

    const error = getByTestId('error');

    // @ts-ignore
    expect(error).toHaveTextContent('required');

    fireEvent.change(input, { target: { value: 'admin' } });

    rerender(ui);

    // @ts-ignore
    expect(error).toHaveTextContent('email');
  });

  it('should provide form level validation info', () => {
    const ui = <Assert initialValue="" />;
    const { getByTestId, rerender } = render(ui);
    const button = getByTestId('button');
    const input = getByTestId('input');

    rerender(ui);

    // @ts-ignore
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'admin@cmyk.com' } });

    rerender(ui);

    // @ts-ignore
    expect(button).not.toBeDisabled();
  });

  it('should set a submitting state', () => {
    const ui = <Assert initialValue="admin@cmyk.com" />;
    const { getByTestId, rerender } = render(ui);
    const submit = getByTestId('button');
    rerender(ui);

    // @ts-ignore
    expect(submit).not.toBeDisabled();

    fireEvent.click(submit);

    const submitting = waitForElement(() => getByTestId('submitting'));
    expect(submitting).not.toBeNull();
  });
});
