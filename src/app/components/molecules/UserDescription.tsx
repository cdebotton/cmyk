import React, { SFC } from 'react';
import styled from 'styled-components';
import { MutationFn } from 'react-apollo';
import fromNow from '../../lib/fromNow';

type Props = {
  className?: string;
  isCurrentUser: boolean;
  user: {
    id: string;
    email: string;
    lastLogin: string | null;
  };
  deleteUser: MutationFn<any, any>;
};

const UserDescription: SFC<Props> = ({
  className,
  user,
  deleteUser,
  isCurrentUser,
}) => (
  <div className={className}>
    {user.email}
    {user.lastLogin ? fromNow(user.lastLogin) : 'Never'}
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
  </div>
);

export default styled(UserDescription)`
  position: relative;
`;
