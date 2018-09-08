/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  UNAUTHORIZED = "UNAUTHORIZED",
  USER = "USER",
}

export interface DocumentCreateWithoutAuthorInput {
  publishDate: any;
  title: string;
  type: DocumentTypeCreateOneWithoutDocumentsInput;
}

export interface DocumentTypeCreateOneWithoutDocumentsInput {
  create?: DocumentTypeCreateWithoutDocumentsInput | null;
  connect?: DocumentTypeWhereUniqueInput | null;
}

export interface DocumentTypeCreateWithoutDocumentsInput {
  title: string;
}

export interface DocumentTypeUpdateOneWithoutDocumentsInput {
  create?: DocumentTypeCreateWithoutDocumentsInput | null;
  connect?: DocumentTypeWhereUniqueInput | null;
  delete?: boolean | null;
  update?: DocumentTypeUpdateWithoutDocumentsDataInput | null;
  upsert?: DocumentTypeUpsertWithoutDocumentsInput | null;
}

export interface DocumentTypeUpdateWithoutDocumentsDataInput {
  title?: string | null;
}

export interface DocumentTypeUpsertWithoutDocumentsInput {
  update: DocumentTypeUpdateWithoutDocumentsDataInput;
  create: DocumentTypeCreateWithoutDocumentsInput;
}

export interface DocumentTypeWhereUniqueInput {
  id?: string | null;
}

export interface DocumentUpdateManyWithoutAuthorInput {
  create?: DocumentCreateWithoutAuthorInput[] | null;
  connect?: DocumentWhereUniqueInput[] | null;
  disconnect?: DocumentWhereUniqueInput[] | null;
  delete?: DocumentWhereUniqueInput[] | null;
  update?: DocumentUpdateWithWhereUniqueWithoutAuthorInput[] | null;
  upsert?: DocumentUpsertWithWhereUniqueWithoutAuthorInput[] | null;
}

export interface DocumentUpdateWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput;
  data: DocumentUpdateWithoutAuthorDataInput;
}

export interface DocumentUpdateWithoutAuthorDataInput {
  publishDate?: any | null;
  title?: string | null;
  type?: DocumentTypeUpdateOneWithoutDocumentsInput | null;
}

export interface DocumentUpsertWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput;
  update: DocumentUpdateWithoutAuthorDataInput;
  create: DocumentCreateWithoutAuthorInput;
}

export interface DocumentWhereUniqueInput {
  id?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ProfileCreateWithoutUserInput {
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: any | null;
}

export interface ProfileUpdateOneWithoutUserInput {
  create?: ProfileCreateWithoutUserInput | null;
  connect?: ProfileWhereUniqueInput | null;
  delete?: boolean | null;
  update?: ProfileUpdateWithoutUserDataInput | null;
  upsert?: ProfileUpsertWithoutUserInput | null;
}

export interface ProfileUpdateWithoutUserDataInput {
  firstName?: string | null;
  lastName?: string | null;
  dateOfBirth?: any | null;
}

export interface ProfileUpsertWithoutUserInput {
  update: ProfileUpdateWithoutUserDataInput;
  create: ProfileCreateWithoutUserInput;
}

export interface ProfileWhereUniqueInput {
  id?: string | null;
}

export interface UserUpdateInput {
  email?: string | null;
  password?: string | null;
  role?: Role | null;
  lastLogin?: any | null;
  profile?: ProfileUpdateOneWithoutUserInput | null;
  documents?: DocumentUpdateManyWithoutAuthorInput | null;
}

export interface UserWhereUniqueInput {
  id?: string | null;
  email?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
