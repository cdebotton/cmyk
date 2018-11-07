import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import * as yup from 'yup';
import { Form, useField, useForm } from '../useForm';

describe('useForm', () => {
  interface Props<T> {
    initialValues: T;
    validationSchema?: yup.Schema<T>;
    children: (form: Form<T>) => null;
  }

  function Assert<T>({ children, initialValues, validationSchema }: Props<T>) {
    const form = useForm({ initialValues, validationSchema });
    return children(form);
  }

  it('should provide a values object', () => {
    let form:
      | Form<{
          foo: string;
          baz: string;
        }>
      | undefined;

    render(
      <Assert initialValues={{ foo: 'bar', baz: 'bat' }}>
        {assertForm => {
          form = assertForm;
          return null;
        }}
      </Assert>,
    );

    if (!form) {
      throw new Error('Form is undefined');
    }

    expect(form.values.foo).toBe('bar');
    expect(form.values.baz).toBe('bat');
  });

  it('should provide a means to set the value', () => {
    let form: Form<{ field: string }> | undefined;

    render(
      <Assert initialValues={{ field: '' }}>
        {assertForm => {
          form = assertForm;
          return null;
        }}
      </Assert>,
    );

    if (!form) {
      throw new Error('Form is undefined');
    }

    expect(form.values.field).toBe('');

    form.change('field', 'foo');

    expect(form.values.field).toBe('foo');
  });

  it('should provide a dirty prop that is set to true when the form values differ from the initial values', () => {
    let form: Form<{ fieldA: string; fieldB: string }> | undefined;

    const ui = (
      <Assert initialValues={{ fieldA: '', fieldB: '' }}>
        {assertForm => {
          form = assertForm;
          return null;
        }}
      </Assert>
    );

    render(ui);

    if (!form) {
      throw new Error('Form is undefined');
    }

    expect(form.dirty.fieldA).toBe(false);

    form.change('fieldA', 'foo');

    expect(form.dirty.fieldA).toBe(true);

    form.change('fieldA', '');

    expect(form.dirty.fieldA).toBe(false);
  });

  it('should provide a means to focus and blur fields', () => {
    let form: Form<{ fieldA: string; fieldB: string }> | undefined;

    const ui = (
      <Assert initialValues={{ fieldA: '', fieldB: '' }}>
        {assertForm => {
          form = assertForm;
          return null;
        }}
      </Assert>
    );

    render(ui);

    if (!form) {
      throw new Error('Form is undefined');
    }

    expect(form.touched.fieldA).toBe(false);

    form.focus('fieldA');

    expect(form.focused.fieldA).toBe(true);

    form.blur('fieldA');

    expect(form.touched.fieldA).toBe(true);
    expect(form.focused.fieldA).toBe(false);
  });

  it('should provide validation', () => {
    let form: Form<{ fieldA: string; fieldB: string }> | undefined;
    const validationSchema = yup
      .object<{ fieldA: string; fieldB: string }>()
      .shape({
        fieldA: yup.string().required('req'),
        fieldB: yup.string(),
      });

    const ui = (
      <Assert
        initialValues={{ fieldA: '', fieldB: '' }}
        validationSchema={validationSchema}
      >
        {assertForm => {
          form = assertForm;
          return null;
        }}
      </Assert>
    );

    render(ui);

    if (!form) {
      throw new Error('Form is undefined');
    }

    expect(form.errors.fieldA).toEqual(['req']);
    expect(form.valid).toBe(false);

    form.change('fieldA', 'foo');

    expect(form.errors.fieldA).toBe(null);
    expect(form.valid).toBe(true);
  });
});

describe('useInput', () => {
  it('should provide an input object for binding to components', () => {
    interface Props {
      children: (form: Form<{ field: string }>) => null;
    }

    function Assert({ children }: Props) {
      const hook = useForm({ initialValues: { field: '' } });
      const field = useField('field', hook);

      return (
        <>
          <input data-testid="input" {...field.input} />
          {children(hook)}
        </>
      );
    }

    let form: Form<{ field: string }> | undefined;
    const { getByTestId } = render(
      <Assert>
        {assertForm => {
          form = assertForm;
          return null;
        }}
      </Assert>,
    );

    const input = getByTestId('input');

    if (!(input instanceof HTMLInputElement) || !form) {
      return;
    }

    expect(form.values.field).toBe('');
    expect(input.value).toBe('');

    fireEvent.change(input, { target: { value: 'foo' } });
    expect(form.values.field).toBe('foo');
    expect(input.value).toBe('foo');
    expect(form.dirty.field).toBe(true);

    form.change('field', 'bar');
    expect(form.values.field).toBe('bar');
    expect(input.value).toBe('bar');

    fireEvent.change(input, { target: { value: '' } });
    expect(form.dirty.field).toBe(false);

    fireEvent.focus(input);
    expect(form.focused.field).toBe(true);
    expect(form.touched.field).toBe(false);

    fireEvent.blur(input);
    expect(form.focused.field).toBe(false);
    expect(form.touched.field).toBe(true);
  });
});
