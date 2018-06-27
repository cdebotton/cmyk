import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  className?: string;
  label: ReactNode;
  navigation: ReactNode;
}

interface State {
  open: boolean;
}

const Controls = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Navigation = styled.nav`
  display: grid;
  align-content: start;
  grid-column: 2 / span 1;
  justify-items: center;
`;

class Sidebar extends Component<Props, State> {
  state = { open: false };

  render() {
    const { className, label, navigation } = this.props;

    return (
      <div className={className}>
        <Controls>
          <button onClick={this._toggleOpen}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {label}
        </Controls>
        {this.state.open && <Navigation>{navigation}</Navigation>}
      </div>
    );
  }

  _toggleOpen = () => {
    this.setState(state => ({ ...state, open: !state.open }));
  };
}

export default styled(Sidebar)`
  display: grid;
  grid-template-columns: min-content min-content;
  justify-items: center;
`;
