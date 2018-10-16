/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Role } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL fragment: userRow
// ====================================================

export interface userRow_profile_avatar {
  __typename: "File";
  id: string;
  url: string;
}

export interface userRow_profile {
  __typename: "Profile";
  id: string;
  firstName: string;
  lastName: string;
  avatar: userRow_profile_avatar | null;
}

export interface userRow {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  lastLogin: any | null;
  createdAt: any;
  profile: userRow_profile;
}
