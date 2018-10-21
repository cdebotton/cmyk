import React, { Component, createContext, ReactNode } from 'react';

interface Props {
  element: HTMLElement | null;
}

interface State {
  element: HTMLElement | null;
  portalNode: ReactNode;
  setPortalNode: (node: ReactNode) => void;
}

const Context = createContext<State>({
  element: null,
  portalNode: null,
  setPortalNode: () => undefined,
});

class Provider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      element: props.element,
      portalNode: null,
      setPortalNode: this.setPortalNode,
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

  setPortalNode = (portalNode: ReactNode) => {
    this.setState(() => ({ portalNode }));
  };
}

export default {
  Provider,
  Consumer: Context.Consumer,
};
