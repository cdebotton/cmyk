import React, { Component, ReactNode } from 'react';

enum ToggleActionType {
  On,
  Off,
}

function on() {
  return {
    type: ToggleActionType.On,
  };
}

function off() {
  return {
    type: ToggleActionType.Off,
  };
}

type ToggleAction = ReturnType<typeof on> | ReturnType<typeof off>;

interface State {
  on: boolean;
  setOn: () => void;
  setOff: () => void;
}

interface Props {
  initialValue?: boolean;
  children: (state: State) => ReactNode;
}

function toggle(state: State, action: ToggleAction): State {
  switch (action.type) {
    case ToggleActionType.On:
      return { ...state, on: true };
    case ToggleActionType.Off:
      return { ...state, on: false };
    default:
      return state;
  }
}

class Toggle extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      on: props.initialValue || false,
      setOff: this.setOff,
      setOn: this.setOn,
    };
  }

  render() {
    return this.props.children(this.state);
  }

  setOn = () =>
    this.setState(state => {
      return {
        ...state,
        on: true,
      };
    });

  setOff = () =>
    this.setState(state => {
      return {
        ...state,
        on: false,
      };
    });
}

export default Toggle;
