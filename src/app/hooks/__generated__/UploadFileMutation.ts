/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UploadFileMutation
// ====================================================

export interface UploadFileMutation_uploadFile {
  __typename: "File";
  id: string;
  bucket: string;
  key: string;
  url: string;
}

export interface UploadFileMutation {
  uploadFile: UploadFileMutation_uploadFile;
}

export interface UploadFileMutationVariables {
  file: any;
}
