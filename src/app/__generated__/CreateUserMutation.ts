/* tslint:disable */
// This file was automatically generated and should not be edited.

import { UserCreateInput, Role } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateUserMutation
// ====================================================

export interface CreateUserMutation_createUser_profile {
  __typename: "Profile";
  firstName: string;
  lastName: string;
}

export interface CreateUserMutation_createUser {
  __typename: "User";
  id: string;
  email: string;
  createdAt: any;
  updatedAt: any | null;
  role: Role;
  lastLogin: any | null;
  profile: CreateUserMutation_createUser_profile;
}

export interface CreateUserMutation {
  createUser: CreateUserMutation_createUser;
}

export interface CreateUserMutationVariables {
  input: UserCreateInput;
}
