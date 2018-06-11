import React, { SFC, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-common-types';
import styled from 'styled-components';
import { rem, modularScale } from 'polished';
import colors from '../../theme/colors';
import Reducer, { ReducerFn } from '../../containers/Reducer';

type Props = NavLinkProps & {
  label: ReactNode;
  icon: IconDefinition | IconName | [IconPrefix, IconName];
};

const Icon = styled(FontAwesomeIcon)`
  position: relative;
  background-color: ${colors.palette.dark[1]};
  color: ${colors.palette.dark[0]};
  font-size: ${rem(34)};

  &:hover {
    color: ${colors.palette.light[0]};
  }
`;

const LabelComponent: SFC<{ show: boolean }> = ({ show: _, ...props }) => (
  <span {...props} />
);

const Label = styled(LabelComponent)`
  position: absolute;
  top: 0;
  left: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  padding: ${rem(0)} ${rem(10)};
  background-color: #000;
  border-radius: 0 3px 3px 0;
  color: #fff;
  font-size: ${rem(12)};
  transition: transform 175ms ease-in-out;
  transform: ${props =>
    props.show ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
`;

type HoverAction = { type: 'SET_HOVER'; payload: boolean };

const hover: ReducerFn<boolean, HoverAction> = (state, action) => {
  switch (action.type) {
    case 'SET_HOVER':
      return action.payload;
    default:
      return state;
  }
};

const PageLink: SFC<Props> = ({ icon, label, ...props }) => (
  <Reducer reducer={hover} initialValue={false}>
    {({ value: isHovering, dispatch }) => (
      <NavLink
        {...props}
        onMouseEnter={() => dispatch({ type: 'SET_HOVER', payload: true })}
        onMouseLeave={() => dispatch({ type: 'SET_HOVER', payload: false })}
      >
        <Label show={isHovering}>{label}</Label>
        <Icon transform="shrink-7" fixedWidth icon={icon} />
      </NavLink>
    )}
  </Reducer>
);

export default styled(PageLink)`
  position: relative;
  display: flex;
  background-color: inherit;
  text-decoration: none;
`;
