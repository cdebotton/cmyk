/* tslint:disable */
// This file was automatically generated and should not be edited.

import { DocumentCreateInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateDocument
// ====================================================

export interface CreateDocument_createDocument {
  __typename: "Document";
  id: string;
}

export interface CreateDocument {
  createDocument: CreateDocument_createDocument;
}

export interface CreateDocumentVariables {
  data: DocumentCreateInput;
}
