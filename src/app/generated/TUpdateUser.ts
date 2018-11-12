/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserUpdateInput, Role } from "./../../../generated/globalTypes";

// ====================================================
// GraphQL mutation operation: TUpdateUser
// ====================================================

export interface TUpdateUser_updateUser_profile_avatar {
  __typename: "File";
  id: string;
  bucket: string;
  key: string;
}

export interface TUpdateUser_updateUser_profile {
  __typename: "Profile";
  id: string;
  avatar: TUpdateUser_updateUser_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface TUpdateUser_updateUser {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  profile: TUpdateUser_updateUser_profile;
}

export interface TUpdateUser {
  updateUser: TUpdateUser_updateUser | null;
}

export interface TUpdateUserVariables {
  input: UserUpdateInput;
  id: string;
}
