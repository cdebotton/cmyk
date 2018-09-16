/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteUserMutation
// ====================================================

export interface DeleteUserMutation_deleteUser {
  __typename: "User";
  id: string;
}

export interface DeleteUserMutation {
  deleteUser: DeleteUserMutation_deleteUser | null;
}

export interface DeleteUserMutationVariables {
  where: UserWhereUniqueInput;
}
