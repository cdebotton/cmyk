import React, { SFC } from 'react';
import styled from 'styled-components';
import { LocationDescriptor } from 'history';
import { NavLink, Route } from 'react-router-dom';
import { rem } from 'polished';
import colors from '../../theme/colors';
import fromNow from '../../lib/fromNow';
import Badge from '../atoms/Badge';
import Avatar from '../atoms/Avatar';
import { DateTime } from 'luxon';

type Props = {
  className?: string;
  to: string;
  isCurrentUser: boolean;
  id: string;
  role: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile: {
    firstName: string | null;
    lastName: string | null;
  };
  lastLogin: string | null;
};

const UserLabel: SFC<Props> = ({
  className,
  to,
  id,
  email,
  role,
  createdAt,
  updatedAt,
  lastLogin,
  profile,
}) => {
  const hasName = profile.firstName !== null && profile.lastName !== null;
  const createdAtDate = DateTime.fromISO(createdAt).toFormat('MMMM dd, yyyy');
  const updatedAtDate = DateTime.fromISO(updatedAt).toFormat('MMMM dd, yyyy');

  return (
    <Route path={to}>
      {({ match }) => (
        <div className={className}>
          <UserProfileImage to={to}>
            <Avatar url="https://placeimg.com/64/64/people" />}
            <UserRoleBadge>{role}</UserRoleBadge>
          </UserProfileImage>
          <Name to={to}>
            {hasName ? `${profile.firstName} ${profile.lastName}` : email}
          </Name>
          {hasName && <Email to={to}>{email}</Email>}
          <LastLogin>
            {lastLogin ? 'Last seen ' + fromNow(lastLogin) : "Hasn't logged in"}
          </LastLogin>
          <CreatedAt>
            Created {createdAtDate}, Updated {updatedAtDate}
          </CreatedAt>
          <ActiveSlate isActive={match !== null} />
        </div>
      )}
    </Route>
  );
};

export default styled(UserLabel)`
  position: relative;
  display: grid;
  overflow: hidden;
  align-items: end;
  padding: ${rem(16)} ${rem(32)};
  background-color: ${props =>
    props.isCurrentUser ? colors.palette.dark[0] : 'inherit'};
  grid-gap: ${rem(16)};
  grid-template-columns: ${rem(64)} 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  text-decoration: none;
`;

const UserRoleBadge = Badge.extend`
  position: absolute;
  bottom: 10%;
  left: 5%;
`;

const UserProfileImage = styled(NavLink)`
  position: relative;
  grid-column: 1;
  grid-row: 1 / span 2;
`;

const Name = styled(NavLink)`
  align-self: end;
  color: ${colors.palette.light[0]};
  font-weight: 800;
  grid-row: 1 / span 1;
  text-decoration: none;
`;

const Email = styled(NavLink)`
  align-self: start;
  color: ${colors.palette.light[1]};
  font-size: ${rem(12)};
  grid-row: 2 / span 1;
  text-decoration: none;
`;

const CreatedAt = styled.div`
  align-self: start;
  color: ${colors.palette.light[2]};
  font-size: ${rem(10)};
  grid-column: 3 / span 1;
  grid-row: 2 / span 1;
`;

const LastLogin = styled.span`
  align-self: end;
  color: ${colors.palette.light[1]};
  font-size: ${rem(12)};
  font-weight: 800;
  grid-column: 3 / span 1;
  grid-row: 1;
`;

/**
 * Replace this with react pose
 */

const ActiveSlate = styled(
  (props: { className?: string; isActive: boolean }) => (
    <span className={props.className} />
  ),
)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: transform 175ms ease-in-out;
  transform: ${props =>
    `translate3d(${props.isActive ? 0 : '100%'}, ${
      props.isActive ? 0 : '100%'
    }, 0)`};
`;
