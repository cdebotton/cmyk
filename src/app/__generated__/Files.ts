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
