/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Session
// ====================================================

export interface Session_session_user {
  __typename: "User";
  id: string;
  email: string;
}

export interface Session_session {
  __typename: "Session";
  iat: number;
  user: Session_session_user;
}

export interface Session {
  session: Session_session | null;
}
