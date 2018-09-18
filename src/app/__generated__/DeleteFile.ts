/* tslint:disable */
// This file was automatically generated and should not be edited.

import { FileWhereUniqueInput } from "./../../../__generated__/globalTypes";

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
  where: FileWhereUniqueInput;
}
