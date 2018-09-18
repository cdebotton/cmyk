/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Role } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users_profile_avatar {
  __typename: "File";
  id: string;
  url: string;
}

export interface Users_users_profile {
  __typename: "Profile";
  avatar: Users_users_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface Users_users {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  lastLogin: any | null;
  createdAt: any;
  profile: Users_users_profile;
}

export interface Users {
  users: Users_users[];
}
