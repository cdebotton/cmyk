/* tslint:disable */
// This file was automatically generated and should not be edited.

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
  id: string;
}
