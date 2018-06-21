import React, { SFC } from 'react';
import styled from 'styled-components';
import { rem, transparentize } from 'polished';
import colors from '../../theme/colors';
import fromNow from '../../lib/fromNow';
import Badge from '../atoms/Badge';
import Avatar from '../atoms/Avatar';
import { DateTime } from 'luxon';

type Props = {
  isActive?: boolean;
  className?: string;
  to: string;
  isCurrentUser: boolean;
  isEven?: boolean;
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
    <div className={className}>
      <UserProfileImage>
        <Avatar url="https://placeimg.com/64/64/people" />
        <UserRoleBadge>{role}</UserRoleBadge>
      </UserProfileImage>
      <Name>
        {hasName ? `${profile.firstName} ${profile.lastName}` : email}
      </Name>
      {hasName && <Email>{email}</Email>}
      <LastLogin>
        {lastLogin ? 'Last seen ' + fromNow(lastLogin) : "Hasn't logged in"}
      </LastLogin>
      <CreatedAt>
        <span>Created {createdAtDate}</span>
        <span>Updated {updatedAtDate}</span>
      </CreatedAt>
    </div>
  );
};

const getBackgroundColor = (props: Props) => {
  if (props.isCurrentUser) {
    return transparentize(0.8, colors.palette.light[2]);
  }

  if (props.isEven) {
    return colors.palette.dark[1];
  }

  return colors.palette.dark[2];
};

const getBorderRight = (props: Props) => {
  if (props.isActive) {
    return `8px solid ${colors.palette.light[0]}`;
  }

  return `0 solid ${colors.palette.light[0]}`;
};

export default styled(UserLabel)`
  position: relative;
  display: grid;
  overflow: hidden;
  align-items: end;
  padding: ${rem(16)} ${rem(32)};
  border-right: ${getBorderRight};
  background-color: ${getBackgroundColor};
  grid-gap: ${rem(16)};
  grid-template-columns: ${rem(64)} 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  text-decoration: none;
  transition: all 175ms ease-in-out;
`;

const UserRoleBadge = Badge.extend`
  position: absolute;
  bottom: 10%;
  left: 5%;
`;

const UserProfileImage = styled.div`
  position: relative;
  grid-column: 1;
  grid-row: 1 / span 2;
`;

const Name = styled.div`
  align-self: end;
  color: ${colors.palette.light[0]};
  font-weight: 800;
  grid-row: 1 / span 1;
  text-decoration: none;
`;

const Email = styled.div`
  align-self: start;
  color: ${colors.palette.light[1]};
  font-size: ${rem(12)};
  grid-row: 2 / span 1;
  text-decoration: none;
`;

const CreatedAt = styled.div`
  display: flex;
  flex-flow: column nowrap;
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
