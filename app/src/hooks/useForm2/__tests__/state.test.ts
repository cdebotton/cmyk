import { reducer } from '../state';

describe('useForm.state', () => {
  const payload = {
    foo: '',
    bar: { baz: 1 },
    bat: [false, true, true],
    bat2: [{ complex: false }],
  };

  it('should initialize', () => {
    let state = reducer(undefined, {
      type: '@@INIT_ACTION',
      payload,
    });

    // Ensure values hydrated
    expect(state.values.foo).toBe(payload.foo);
    expect(state.values.bar.baz).toBe(payload.bar.baz);
    expect(state.values.bat[0]).toBe(payload.bat[0]);
    expect(state.values.bat[1]).toBe(payload.bat[1]);
    expect(state.values.bat2[0].complex).toBe(payload.bat2[0].complex);

    // Ensure touched hydrated
    expect(state.touched.foo).toBe(false);
    expect(state.touched.bar.baz).toBe(false);
    expect(state.touched.bat[0]).toBe(false);
    expect(state.touched.bat[1]).toBe(false);
    expect(state.touched.bat2[0].complex).toBe(false);

    // Ensure focused hydrated
    expect(state.focused.foo).toBe(false);
    expect(state.focused.bar.baz).toBe(false);
    expect(state.focused.bat[0]).toBe(false);
    expect(state.focused.bat[1]).toBe(false);
    expect(state.focused.bat2[0].complex).toBe(false);

    // Ensure dirty hydrated
    expect(state.dirty.foo).toBe(false);
    expect(state.dirty.bar.baz).toBe(false);
    expect(state.dirty.bat[0]).toBe(false);
    expect(state.dirty.bat[1]).toBe(false);
    expect(state.dirty.bat2[0].complex).toBe(false);

    // Ensure errors hydrated
    expect(state.errors.foo).toBe(null);
    expect(state.errors.bar.baz).toBe(null);
    expect(state.errors.bat[0]).toBe(null);
    expect(state.errors.bat[1]).toBe(null);
    expect(state.errors.bat2[0].complex).toBe(null);
  });

  it('should immutably update values', () => {
    let state = reducer(undefined, { type: '@@INIT_ACTION', payload });

    let nextState = reducer(state, {
      type: 'CHANGE_FIELD',
      payload: { path: 'foo', value: 'bar' },
    });
    expect(nextState.values).not.toBe(state.values);
    expect(nextState.values.foo).toEqual('bar');

    const lastBar = nextState.values.bar;
    nextState = reducer(nextState, {
      type: 'CHANGE_FIELD',
      payload: { path: 'bar.baz', value: 2 },
    });
    expect(nextState.values.bar).not.toBe(lastBar);
    expect(nextState.values.bar.baz).toBe(2);

    nextState = reducer(nextState, {
      type: 'CHANGE_FIELD',
      payload: { path: 'bat[1]', value: false },
    });
    expect(nextState.values.bat[1]).toBe(false);

    nextState = reducer(nextState, {
      type: 'CHANGE_FIELD',
      payload: { path: 'bat2[0].complex', value: true },
    });

    expect(nextState.values.bat2[0].complex).toBe(true);
  });

  it('should appropriately set the dirty value based on the new value', () => {
    let state = reducer(undefined, { type: '@@INIT_ACTION', payload });

    state = reducer(state, {
      type: 'CHANGE_FIELD',
      payload: {
        path: 'bar.baz',
        value: 2,
      },
    });

    expect(state.dirty.bar.baz).toBe(true);

    state = reducer(state, {
      type: 'CHANGE_FIELD',
      payload: {
        path: 'bar.baz',
        value: 1,
      },
    });

    expect(state.dirty.bar.baz).toBe(false);
  });

  it('should be able to focus fields', () => {
    let state = reducer(undefined, { type: '@@INIT_ACTION', payload });

    state = reducer(state, { type: 'FOCUS_FIELD', payload: 'foo' });
    state = reducer(state, { type: 'FOCUS_FIELD', payload: 'bar.baz' });
    state = reducer(state, { type: 'FOCUS_FIELD', payload: 'bat2[0].complex' });

    expect(state.focused.foo).toBe(true);
    expect(state.focused.bar.baz).toBe(true);
    expect(state.focused.bat2[0].complex).toBe(true);
  });

  it('should blur and set touched if the field was previously focused', () => {
    let state = reducer(undefined, { type: '@@INIT_ACTION', payload });

    state = reducer(state, { type: 'BLUR_FIELD', payload: 'bar.baz' });

    expect(state.focused.bar.baz).toBe(false);
    expect(state.touched.bar.baz).toBe(false);

    state = reducer(state, { type: 'FOCUS_FIELD', payload: 'bar.baz' });
    state = reducer(state, { type: 'BLUR_FIELD', payload: 'bar.baz' });

    expect(state.focused.bar.baz).toBe(false);
    expect(state.touched.bar.baz).toBe(true);

    state = reducer(state, { type: 'BLUR_FIELD', payload: 'bar.baz' });

    expect(state.focused.bar.baz).toBe(false);
    expect(state.touched.bar.baz).toBe(true);
  });

  it('should allow for adding things to an array', () => {
    let state = reducer(undefined, { type: '@@INIT_ACTION', payload });

    expect(state.values.bat.length).toBe(3);

    state = reducer(state, { type: 'ARRAY_ADD', payload: { path: 'bat', value: false } });

    expect(state.values.bat[2]).toBe(false);
    expect(state.dirty.bat[2]).toBe(false);
    expect(state.focused.bat[2]).toBe(false);
    expect(state.touched.bat[2]).toBe(false);
    expect(state.errors.bat[2]).toBe(null);

    state = reducer(state, {
      type: 'ARRAY_ADD',
      payload: { path: 'bat2', value: { complex: true } },
    });

    expect(state.values.bat2[1].complex).toBe(true);
    expect(state.dirty.bat2[1].complex).toBe(false);
    expect(state.focused.bat2[1].complex).toBe(false);
    expect(state.touched.bat2[1].complex).toBe(false);
    expect(state.errors.bat2[1].complex).toBe(null);
  });

  it('should remove things from an array', () => {
    let state = reducer(undefined, { type: '@@INIT_ACTION', payload });

    expect(state.values.bat.length).toBe(3);
    console.log(state.values);
    state = reducer(state, { type: 'ARRAY_REMOVE', payload: 'bat[0]' });
    expect(state.values.bat.length).toBe(2);
    console.log(state.values);
  });
});
