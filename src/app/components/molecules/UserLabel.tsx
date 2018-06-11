import React, { SFC } from 'react';
import styled from 'styled-components';
import { LocationDescriptor } from 'history';
import { NavLink } from 'react-router-dom';
import { rem } from 'polished';
import colors from '../../theme/colors';
import fromNow from '../../lib/fromNow';
import { MutationFn } from 'react-apollo';
import Badge from '../atoms/Badge';

type Props = {
  className?: string;
  to: LocationDescriptor;
  isCurrentUser: boolean;

  user: {
    id: string;
    role: string;
    email: string;
    profile: {
      firstName: string | null;
      lastName: string | null;
    };
    lastLogin: string | null;
  };
  deleteUser: MutationFn<any, any>;
};

const Avatar = styled(NavLink)`
  position: relative;
  overflow: hidden;
  border: 2px solid ${colors.palette.light[0]};
  border-radius: 50%;
  grid-row: 1 / span 2;
`;

const Name = styled(NavLink)`
  color: ${colors.palette.light[0]};
  font-weight: 800;
  grid-row: 1 / span 1;
  text-decoration: none;
`;

const Role = styled.span`
  align-self: start;
`;

const Email = styled(NavLink)`
  color: ${colors.palette.light[1]};
  font-size: ${rem(12)};
  grid-row: 1 / span 1;
  text-decoration: none;
`;

const LastLogin = styled.span`
  align-self: start;
`;

const Actions = styled.span`
  align-self: end;
  grid-row: 1 / span 1;
`;

const UserLabel: SFC<Props> = ({
  className,
  to,
  user,
  isCurrentUser,
  deleteUser,
}) => (
  <div className={className}>
    <Avatar to={to}>
      <img alt={user.email} src="https://placeimg.com/64/64/people" />
    </Avatar>
    {user.profile.firstName &&
      user.profile.lastName && (
        <Name to={to}>
          {user.profile.firstName} {user.profile.lastName}
        </Name>
      )}
    <Role>
      <Badge>{user.role}</Badge>
    </Role>
    <Email to={to}>{user.email}</Email>
    <LastLogin>
      {user.lastLogin
        ? 'Last seen ' + fromNow(user.lastLogin)
        : "Hasn't logged in"}
    </LastLogin>
    <Actions>
      {!isCurrentUser && (
        <button
          onClick={() =>
            deleteUser({
              variables: { where: { id: user.id } },
            })
          }
          type="button"
        >
          Delete
        </button>
      )}
    </Actions>
  </div>
);

export default styled(UserLabel)`
  position: relative;
  display: grid;
  align-items: end;
  padding: ${rem(10)};
  grid-gap: ${rem(10)};
  grid-template-columns: min-content max-content min-content;
  grid-template-rows: min-content min-content;
  text-decoration: none;
`;
