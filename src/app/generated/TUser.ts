/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Role } from "./../../../generated/globalTypes";

// ====================================================
// GraphQL query operation: TUser
// ====================================================

export interface TUser_user_profile_avatar {
  __typename: "File";
  id: string;
  key: string;
  bucket: string;
  url: string;
}

export interface TUser_user_profile {
  __typename: "Profile";
  id: string;
  avatar: TUser_user_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface TUser_user {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  profile: TUser_user_profile;
}

export interface TUser {
  user: TUser_user | null;
}

export interface TUserVariables {
  id: string;
}
