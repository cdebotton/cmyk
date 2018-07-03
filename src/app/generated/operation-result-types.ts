

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSession
// ====================================================

export interface GetSession_session {
  id: string;
  email: string;
}

export interface GetSession {
  session: GetSession_session | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users {
  id: string;
  email: string;
}

export interface GetUsers {
  users: GetUsers_users[];
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_profile {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: any | null;
}

export interface GetUser_user {
  id: string;
  email: string;
  role: Role;
  profile: GetUser_user_profile;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  where: UserWhereUniqueInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  UNAUTHORIZED = "UNAUTHORIZED",
  USER = "USER",
}

// undefined
export interface UserWhereUniqueInput {
  id?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================