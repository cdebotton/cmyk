import React, { Component, ReactNode } from 'react';

export type Action = {
  type: any;
};

export type DispatcherFn<A> = (action: A) => void;

export type ReducerFn<S, A extends Action> = (state: S, action: A) => S;

type Props<S, A extends Action> = {
  reducer: ReducerFn<S, A>;
  initialValue: S;
  children: (state: State<S, A>) => ReactNode;
};

type State<S, A extends Action> = {
  value: S;
  dispatch: DispatcherFn<A>;
};

class Reducer<S, A extends Action> extends Component<Props<S, A>, State<S, A>> {
  constructor(props: Props<S, A>) {
    super(props);

    this.state = {
      dispatch: this.dispatch,
      value: props.initialValue,
    };
  }

  render() {
    return this.props.children(this.state);
  }

  dispatch = (action: A) => {
    this.setState(state => ({
      ...state,
      value: this.props.reducer(state.value, action),
    }));
  };
}

export default Reducer;
