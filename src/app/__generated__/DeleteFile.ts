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
