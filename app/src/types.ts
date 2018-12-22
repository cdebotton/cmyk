/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TCurrentUser
// ====================================================

export interface TCurrentUser_session_user_profile_avatar {
  __typename: "File";
  id: string;
  url: string;
}

export interface TCurrentUser_session_user_profile {
  __typename: "Profile";
  firstName: string;
  avatar: TCurrentUser_session_user_profile_avatar | null;
}

export interface TCurrentUser_session_user {
  __typename: "User";
  id: string;
  profile: TCurrentUser_session_user_profile;
}

export interface TCurrentUser_session {
  __typename: "Session";
  user: TCurrentUser_session_user;
}

export interface TCurrentUser {
  session: TCurrentUser_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TDocuments
// ====================================================

export interface TDocuments_documents {
  __typename: "Document";
  id: string;
  title: string;
}

export interface TDocuments {
  documents: TDocuments_documents[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_profile_avatar {
  __typename: "File";
  id: string;
  key: string;
  bucket: string;
  url: string;
}

export interface User_user_profile {
  __typename: "Profile";
  avatar: User_user_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface User_user {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  profile: User_user_profile;
}

export interface User {
  user: User_user | null;
}

export interface UserVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TUpdateUser
// ====================================================

export interface TUpdateUser_updateUser_profile_avatar {
  __typename: "File";
  id: string;
  bucket: string;
  key: string;
}

export interface TUpdateUser_updateUser_profile {
  __typename: "Profile";
  avatar: TUpdateUser_updateUser_profile_avatar | null;
  firstName: string;
  lastName: string;
}

export interface TUpdateUser_updateUser {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  profile: TUpdateUser_updateUser_profile;
}

export interface TUpdateUser {
  updateUser: TUpdateUser_updateUser | null;
}

export interface TUpdateUserVariables {
  input: UserUpdateInput;
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Files
// ====================================================

export interface Files_files {
  __typename: "File";
  id: string;
  mimetype: string;
  key: string;
  bucket: string;
  url: string;
  createdAt: any;
}

export interface Files {
  files: Files_files[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteFile
// ====================================================

export interface DeleteFile_deleteFile {
  __typename: "File";
  id: string;
}

export interface DeleteFile {
  deleteFile: DeleteFile_deleteFile | null;
}

export interface DeleteFileVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUserMutation
// ====================================================

export interface CreateUserMutation_createUser_profile_avatar {
  __typename: "File";
  id: string;
  bucket: string;
  key: string;
}

export interface CreateUserMutation_createUser_profile {
  __typename: "Profile";
  avatar: CreateUserMutation_createUser_profile_avatar | null;
  firstName: string;
  lastName: string;
  lastLogin: any | null;
}

export interface CreateUserMutation_createUser {
  __typename: "User";
  id: string;
  email: string;
  createdAt: any;
  updatedAt: any | null;
  role: Role;
  profile: CreateUserMutation_createUser_profile;
}

export interface CreateUserMutation {
  createUser: CreateUserMutation_createUser;
}

export interface CreateUserMutationVariables {
  input: UserCreateInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

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
  firstName: string;
  lastName: string;
  lastLogin: any | null;
  avatar: Users_users_profile_avatar | null;
}

export interface Users_users {
  __typename: "User";
  id: string;
  email: string;
  role: Role;
  createdAt: any;
  profile: Users_users_profile;
}

export interface Users {
  session: Users_session | null;
  users: Users_users[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUserMutation
// ====================================================

export interface DeleteUserMutation_deleteUser {
  __typename: "User";
  id: string;
}

export interface DeleteUserMutation {
  deleteUser: DeleteUserMutation_deleteUser | null;
}

export interface DeleteUserMutationVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProtectedSession
// ====================================================

export interface ProtectedSession_session_user {
  __typename: "User";
  id: string;
}

export interface ProtectedSession_session {
  __typename: "Session";
  iat: number;
  user: ProtectedSession_session_user;
}

export interface ProtectedSession {
  session: ProtectedSession_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: TUploadFile
// ====================================================

export interface TUploadFile_uploadFile {
  __typename: "File";
  id: string;
  bucket: string;
  key: string;
  url: string;
}

export interface TUploadFile {
  uploadFile: TUploadFile_uploadFile;
}

export interface TUploadFileVariables {
  file: any;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login {
  login: string | null;
}

export interface LoginVariables {
  email: string;
  password: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Session
// ====================================================

export interface Session_session {
  __typename: "Session";
  iat: number;
}

export interface Session {
  session: Session_session | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewDocument
// ====================================================

export interface NewDocument_layouts {
  __typename: "Layout";
  id: string;
  title: string;
}

export interface NewDocument {
  layouts: NewDocument_layouts[];
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
  VIEWER = "VIEWER",
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
