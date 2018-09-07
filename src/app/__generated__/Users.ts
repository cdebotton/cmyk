/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Users
// ====================================================

export interface Users_users_profile {
  __typename: "Profile";
  firstName: string | null;
  lastName: string | null;
}

export interface Users_users {
  __typename: "User";
  id: string;
  email: string;
  profile: Users_users_profile;
}

export interface Users {
  users: Users_users[];
}
