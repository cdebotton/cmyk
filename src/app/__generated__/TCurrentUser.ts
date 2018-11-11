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
  id: string;
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
