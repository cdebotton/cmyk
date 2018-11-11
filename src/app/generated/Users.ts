/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Role } from "./../../../generated/globalTypes";

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_session_user {
  __typename: "User";
  id: string;
}

export interface Users_session {
  __typename: "Session";
  user: Users_session_user;
}

export interface Users_users_profile_avatar {
  __typename: "File";
  id: string;
  url: string;
}

export interface Users_users_profile {
  __typename: "Profile";
  id: string;
  firstName: string;
  lastName: string;
  avatar: Users_users_profile_avatar | null;
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
  session: Users_session | null;
  users: Users_users[];
}
