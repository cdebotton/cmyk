/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUserQuery
// ====================================================

export interface CurrentUserQuery_session_user_profile_avatar {
  __typename: "File";
  id: string;
  url: string;
}

export interface CurrentUserQuery_session_user_profile {
  __typename: "Profile";
  id: string;
  firstName: string;
  avatar: CurrentUserQuery_session_user_profile_avatar | null;
}

export interface CurrentUserQuery_session_user {
  __typename: "User";
  id: string;
  profile: CurrentUserQuery_session_user_profile;
}

export interface CurrentUserQuery_session {
  __typename: "Session";
  user: CurrentUserQuery_session_user;
}

export interface CurrentUserQuery {
  session: CurrentUserQuery_session | null;
}
