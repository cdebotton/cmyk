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
