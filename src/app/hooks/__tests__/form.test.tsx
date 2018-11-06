import React, { ReactNode } from 'react';
import { fireEvent, render, wait } from 'react-testing-library';
import useInput, { FormInput } from '../form';

describe('input', () => {
  interface Props {
    children?: (input: any) => ReactNode;
  }

  function Input({ children }: Props) {
    const email = useInput('');
    return (
      <>
        <input data-testid="input" {...email.input} />;
        {children && children(email)}
      </>
    );
  }

  it('should provide input bindings', () => {
    const { getByTestId } = render(<Input />);

    const input = getByTestId('input');
    if (!(input instanceof HTMLInputElement)) {
      return;
    }

    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'foo' } });
    expect(input.value).toBe('foo');
  });

  it('should expose a dirty prop that becomes true after changing value', () => {
    let meta: FormInput<string>['meta'] | undefined;

    const { getByTestId } = render(
      <Input>
        {email => {
          meta = email.meta;
          return null;
        }}
      </Input>,
    );

    const input = getByTestId('input');

    expect(meta).toBeDefined();
    expect(meta!.dirty).toBe(false);

    fireEvent.change(input, { target: { value: 'bar' } });

    expect(meta!.dirty).toBe(true);
  });

  it('should expose a touched prop that becomes true after a blur event', () => {
    let meta: FormInput<string>['meta'] | undefined;

    const { getByTestId } = render(
      <Input>
        {email => {
          meta = email.meta;
          return null;
        }}
      </Input>,
    );

    const input = getByTestId('input');

    expect(meta).toBeDefined();
    expect(meta!.touched).toBe(false);

    fireEvent.blur(input);

    expect(meta!.touched).toBe(true);
  });

  it('should expose a focused prop', () => {
    let meta: FormInput<string>['meta'] | undefined;

    const { getByTestId } = render(
      <Input>
        {email => {
          meta = email.meta;
          return null;
        }}
      </Input>,
    );

    const input = getByTestId('input');

    expect(meta).toBeDefined();
    expect(meta!.focused).toBe(false);

    fireEvent.focus(input);

    expect(meta!.focused).toBe(true);

    fireEvent.blur(input);

    expect(meta!.focused).toBe(false);
  });
});
