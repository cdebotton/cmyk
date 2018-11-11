/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserUpdateInput, Role } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserMutation
// ====================================================

export interface UpdateUserMutation_updateUser_profile_avatar {
  __typename: "File";
  id: string;
  bucket: string;
  key: string;
}

export interface UpdateUserMutation_updateUser_profile {
  __typename: "Profile";
  id: string;
  avatar: UpdateUserMutation_updateUser_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface UpdateUserMutation_updateUser {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  profile: UpdateUserMutation_updateUser_profile;
}

export interface UpdateUserMutation {
  updateUser: UpdateUserMutation_updateUser | null;
}

export interface UpdateUserMutationVariables {
  input: UserUpdateInput;
  id: string;
}
