import React, { SFC, ReactNode } from 'react';
import { Link, NavLinkProps, Route } from 'react-router-dom';
import FontAwesomeIcon, {
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-common-types';
import styled from 'styled-components';
import { rem } from 'polished';
import colors from '../../theme/colors';
import Reducer, { ReducerFn } from '../../containers/Reducer';

type Props = NavLinkProps & {
  label: ReactNode;
  icon: IconDefinition | IconName | [IconPrefix, IconName];
};

type IconLinkProps = FontAwesomeIconProps & { isActive: boolean };

const IconWrapper: SFC<IconLinkProps> = ({ isActive: _, ...props }) => (
  <FontAwesomeIcon {...props} />
);

const Icon = styled(IconWrapper)`
  position: relative;
  background-color: ${colors.palette.dark[1]};
  color: ${props =>
    props.isActive ? colors.palette.light[0] : colors.palette.dark[2]};
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
  transform: ${props =>
    props.show ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'};
  transition: transform 175ms ease-in-out;
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

const PageLink: SFC<Props> = ({ icon, label, exact, to, ...props }) => {
  const path = typeof to === 'object' ? to.pathname : to;

  return (
    <Route path={path} exact={exact} location={props.location}>
      {({ match, location }) => (
        <Reducer reducer={hover} initialValue={false}>
          {({ value: isHovering, dispatch }) => (
            <Link
              {...props}
              to={to}
              onMouseEnter={() =>
                dispatch({ type: 'SET_HOVER', payload: true })
              }
              onMouseLeave={() =>
                dispatch({ type: 'SET_HOVER', payload: false })
              }
            >
              <Label show={isHovering}>{label}</Label>
              <Icon
                transform="shrink-7"
                fixedWidth
                icon={icon}
                isActive={match !== null}
              />
            </Link>
          )}
        </Reducer>
      )}
    </Route>
  );
};

export default styled(PageLink)`
  position: relative;
  display: flex;
  background-color: inherit;
  text-decoration: none;
`;
