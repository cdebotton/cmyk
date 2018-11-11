/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DocumentCreateInput } from "./../../../generated/globalTypes";

// ====================================================
// GraphQL mutation operation: TCreateDocument
// ====================================================

export interface TCreateDocument_createDocument {
  __typename: "Document";
  id: string;
}

export interface TCreateDocument {
  createDocument: TCreateDocument_createDocument;
}

export interface TCreateDocumentVariables {
  input: DocumentCreateInput;
}
