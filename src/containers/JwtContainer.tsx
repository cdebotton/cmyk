import React, { Component, createContext } from 'react';

type JsonWebToken = string | null;
type Props = { jwt: JsonWebToken };
type State = { jwt?: JsonWebToken; setJwt: (jwt: string) => void };

const Context = createContext<State>({
  jwt: undefined,
  setJwt: _ => undefined,
});

Context.Provider.displayName = 'JwtContextProvider';
Context.Consumer.displayName = 'JwtContextConsumer';

class JwtProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { jwt: props.jwt, setJwt: this.setJwt };
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }

  setJwt = (jwt: JsonWebToken) => {
    this.setState(state => ({ ...state, jwt }));
  };
}

export default {
  Provider: JwtProvider,
  Consumer: Context.Consumer,
};
