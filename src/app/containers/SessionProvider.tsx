import React, { Component, createContext } from 'react';

type Session = {
  userId: string;
  iat: number;
};

type ContextInterface = {
  session: Session | null;
  updateSession: (session: Session | null) => void;
};

const Context = createContext<ContextInterface>({
  session: null,
  updateSession: () => null,
});

type Props = {
  session: Session | null;
};

type State = ContextInterface;

class SessionProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      session: props.session,
      updateSession: this.updateSession,
    };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

  updateSession = (session: Session | null) => {
    this.setState(state => ({ ...state, session }));
  };
}

export default SessionProvider;
