import React, { SFC } from 'react';
import styled from 'styled-components';
import { LocationDescriptor } from 'history';
import { NavLink } from 'react-router-dom';
import { rem } from 'polished';
import colors from '../../theme/colors';
import fromNow from '../../lib/fromNow';
import Badge from '../atoms/Badge';
import Avatar from '../atoms/Avatar';
import { DateTime } from 'luxon';

type Props = {
  className?: string;
  to: LocationDescriptor;
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
  isCurrentUser,
}) => {
  const hasName = profile.firstName !== null && profile.lastName !== null;
  const createdAtDate = DateTime.fromISO(createdAt).toFormat('MMMM dd, yyyy');
  const updatedAtDate = DateTime.fromISO(updatedAt).toFormat('MMMM dd, yyyy');

  return (
    <div className={className}>
      <UserProfileImage to={to}>
        <Avatar url="https://placeimg.com/64/64/people" />
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
    </div>
  );
};

export default styled(UserLabel)`
  position: relative;
  display: grid;
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
