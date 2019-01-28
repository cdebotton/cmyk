import cloneDeep from 'lodash.clonedeep';
import { Mapped, setNested, getIn, setIn, arrayRemoveIn, arrayAddIn } from './utils';

export type State<Values> = {
  values: Values;
  committed: Values;
  touched: Mapped<Values, boolean>;
  dirty: Mapped<Values, boolean>;
  focused: Mapped<Values, boolean>;
  errors: Mapped<Values, string | null>;
  isSubmitting: boolean;
  isValidating: boolean;
};

type ChangeAction = {
  type: 'CHANGE_FIELD';
  payload: {
    path: string;
    value: any;
  };
};

type ArrayAddAction = {
  type: 'ARRAY_ADD';
  payload: {
    path: string;
    value: any;
  };
};

type ArrayRemoveAction = {
  type: 'ARRAY_REMOVE';
  payload: string;
};

type ArraySwapAction = {
  type: 'ARRAY_SWAP';
  payload: {
    path: string;
    from: number;
    to: number;
  };
};

type FocusAction = {
  type: 'FOCUS_FIELD';
  payload: string;
};

type BlurAction = {
  type: 'BLUR_FIELD';
  payload: string;
};

type InitAction<Values> = {
  type: '@@INIT_ACTION';
  payload: Values;
};

export type Action<Values> =
  | ChangeAction
  | FocusAction
  | BlurAction
  | ArrayAddAction
  | ArrayRemoveAction
  | ArraySwapAction
  | InitAction<Values>;

export function reducer<Values>(
  state: State<Values> | undefined,
  action: Action<Values>,
): State<Values> {
  if (action.type === '@@INIT_ACTION') {
    return {
      values: action.payload,
      committed: cloneDeep(action.payload),
      touched: setNested(action.payload, false),
      dirty: setNested(action.payload, false),
      focused: setNested(action.payload, false),
      errors: setNested(action.payload, null),
      isSubmitting: false,
      isValidating: false,
    };
  }

  if (state === undefined) {
    throw new Error('State has not been initialized');
  }

  switch (action.type) {
    case 'CHANGE_FIELD': {
      const { values, committed, dirty } = state;
      const { path, value } = action.payload;
      const isDirty = getIn(committed, path) !== value;
      return { ...state, values: setIn(values, path, value), dirty: setIn(dirty, path, isDirty) };
    }
    case 'FOCUS_FIELD': {
      const { focused } = state;
      const { payload: path } = action;
      return { ...state, focused: setIn(focused, path, true) };
    }
    case 'BLUR_FIELD': {
      const { focused, touched } = state;
      const { payload: path } = action;

      const isTouched = getIn(touched, path) || getIn(focused, path);

      return {
        ...state,
        focused: setIn(focused, path, false),
        touched: setIn(touched, path, isTouched),
      };
    }
    case 'ARRAY_ADD': {
      const { path, value } = action.payload;
      const target = getIn(state.values, path);

      if (!Array.isArray(target)) {
        throw new TypeError(`State value is type ${typeof target}, but must be an array`);
      }

      return {
        ...state,
        values: arrayAddIn(state.values, path, value),
        dirty: arrayAddIn(state.dirty, path, value, false),
        focused: arrayAddIn(state.focused, path, value, false),
        touched: arrayAddIn(state.touched, path, value, false),
        errors: arrayAddIn(state.errors, path, value, null),
      };
    }
    case 'ARRAY_REMOVE': {
      return {
        ...state,
        values: arrayRemoveIn(state.values, action.payload),
        touched: arrayRemoveIn(state.touched, action.payload),
        dirty: arrayRemoveIn(state.dirty, action.payload),
        focused: arrayRemoveIn(state.focused, action.payload),
        errors: arrayRemoveIn(state.errors, action.payload),
      };
    }
    case 'ARRAY_SWAP': {
      return {
        ...state,
      };
    }
  }
}
