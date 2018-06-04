import { Component, ReactNode } from 'react';

export type Action = { type: any };
export type ReducerFn<S, A extends Action> = (
  state: S | undefined,
  action: A | { type: undefined },
) => S;
export type Dispatcher<A extends Action> = (action: A) => void;

type Props<S, A extends Action> = {
  children: (state: State<S, A>) => ReactNode;
  reducer: ReducerFn<S, A>;
  initialState?: S;
};

type State<S, A extends Action> = {
  value: S;
  dispatch: Dispatcher<A>;
};

class Reducer<S, A extends Action> extends Component<Props<S, A>, State<S, A>> {
  constructor(props: Props<S, A>) {
    super(props);
    this.state = {
      value:
        props.initialState || props.reducer(undefined, { type: undefined }),
      dispatch: this.dispatch,
    };
  }

  render() {
    return this.props.children(this.state);
  }

  dispatch = (action: A) =>
    this.setState(state => ({
      ...state,
      value: this.props.reducer(state.value, action),
    }));
}

export default Reducer;
