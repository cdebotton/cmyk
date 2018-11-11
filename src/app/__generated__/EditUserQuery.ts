/* tslint:disable */
// This file was automatically generated and should not be edited.

import { Role } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: EditUserQuery
// ====================================================

export interface EditUserQuery_user_profile_avatar {
  __typename: "File";
  id: string;
  key: string;
  bucket: string;
  url: string;
}

export interface EditUserQuery_user_profile {
  __typename: "Profile";
  id: string;
  avatar: EditUserQuery_user_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface EditUserQuery_user {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  profile: EditUserQuery_user_profile;
}

export interface EditUserQuery {
  user: EditUserQuery_user | null;
}

export interface EditUserQueryVariables {
  id: string;
}
