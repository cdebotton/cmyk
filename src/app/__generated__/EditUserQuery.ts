/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserWhereUniqueInput, Role } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: EditUserQuery
// ====================================================

export interface EditUserQuery_user_profile_avatar {
  __typename: "File";
  id: string;
  filename: string;
}

export interface EditUserQuery_user_profile {
  __typename: "Profile";
  avatar: EditUserQuery_user_profile_avatar | null;
  firstName: string | null;
  lastName: string | null;
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
  where: UserWhereUniqueInput;
}
