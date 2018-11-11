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

export interface DocumentCreateInput {
  title: string;
  publishDate: any;
  type: string;
  author: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserCreateInput {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  role: Role;
  avatar?: string | null;
}

export interface UserUpdateInput {
  email: string;
  firstName: string;
  lastName: string;
  password?: string | null;
  repeatPassword?: string | null;
  role: Role;
  avatar?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
