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
