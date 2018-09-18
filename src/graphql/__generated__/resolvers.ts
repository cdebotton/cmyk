import { GraphQLResolveInfo } from 'graphql';

export interface ITypeMap {
  Context: any;
  Role: any;

  QueryParent: any;
  MutationParent: any;
  SessionParent: any;
  UserParent: any;
  ProfileParent: any;
  DocumentParent: any;
  DocumentTypeParent: any;
  FileParent: any;
}

export interface LoginInput {
  email: string;
  password: string;
}
export interface UserWhereUniqueInput {
  id: string;
  email: string;
}
export interface UserWhereInput {
  AND: string;
  OR: string;
  NOT: string;
  id: string;
  id_not: string;
  id_in: string;
  id_not_in: string;
  id_lt: string;
  id_lte: string;
  id_gt: string;
  id_gte: string;
  id_contains: string;
  id_not_contains: string;
  id_starts_with: string;
  id_not_starts_with: string;
  id_ends_with: string;
  id_not_ends_with: string;
  email: string;
  email_not: string;
  email_in: string;
  email_not_in: string;
  email_lt: string;
  email_lte: string;
  email_gt: string;
  email_gte: string;
  email_contains: string;
  email_not_contains: string;
  email_starts_with: string;
  email_not_starts_with: string;
  email_ends_with: string;
  email_not_ends_with: string;
  password: string;
  password_not: string;
  password_in: string;
  password_not_in: string;
  password_lt: string;
  password_lte: string;
  password_gt: string;
  password_gte: string;
  password_contains: string;
  password_not_contains: string;
  password_starts_with: string;
  password_not_starts_with: string;
  password_ends_with: string;
  password_not_ends_with: string;
  lastLogin: string;
  lastLogin_not: string;
  lastLogin_in: string;
  lastLogin_not_in: string;
  lastLogin_lt: string;
  lastLogin_lte: string;
  lastLogin_gt: string;
  lastLogin_gte: string;
  createdAt: string;
  createdAt_not: string;
  createdAt_in: string;
  createdAt_not_in: string;
  createdAt_lt: string;
  createdAt_lte: string;
  createdAt_gt: string;
  createdAt_gte: string;
  updatedAt: string;
  updatedAt_not: string;
  updatedAt_in: string;
  updatedAt_not_in: string;
  updatedAt_lt: string;
  updatedAt_lte: string;
  updatedAt_gt: string;
  updatedAt_gte: string;
  role: string;
  role_not: string;
  role_in: string;
  role_not_in: string;
  profile: string;
  documents_every: string;
  documents_some: string;
  documents_none: string;
}
export interface UserCreateInput {
  email: string;
  password: string;
  lastLogin: string;
  role: string;
  profile: string;
  documents: string;
}
export interface UserUpdateInput {
  email: string;
  password: string;
  lastLogin: string;
  role: string;
  profile: string;
  documents: string;
}
export interface ProfileCreateOneWithoutUserInput {
  create: string;
  connect: string;
}
export interface DocumentCreateManyWithoutAuthorInput {
  create: string;
  connect: string;
}
export interface ProfileUpdateOneWithoutUserInput {
  create: string;
  connect: string;
  delete: boolean;
  update: string;
  upsert: string;
}
export interface DocumentUpdateManyWithoutAuthorInput {
  create: string;
  connect: string;
  disconnect: string;
  delete: string;
  update: string;
  upsert: string;
}
export interface ProfileWhereInput {
  AND: string;
  OR: string;
  NOT: string;
  id: string;
  id_not: string;
  id_in: string;
  id_not_in: string;
  id_lt: string;
  id_lte: string;
  id_gt: string;
  id_gte: string;
  id_contains: string;
  id_not_contains: string;
  id_starts_with: string;
  id_not_starts_with: string;
  id_ends_with: string;
  id_not_ends_with: string;
  firstName: string;
  firstName_not: string;
  firstName_in: string;
  firstName_not_in: string;
  firstName_lt: string;
  firstName_lte: string;
  firstName_gt: string;
  firstName_gte: string;
  firstName_contains: string;
  firstName_not_contains: string;
  firstName_starts_with: string;
  firstName_not_starts_with: string;
  firstName_ends_with: string;
  firstName_not_ends_with: string;
  lastName: string;
  lastName_not: string;
  lastName_in: string;
  lastName_not_in: string;
  lastName_lt: string;
  lastName_lte: string;
  lastName_gt: string;
  lastName_gte: string;
  lastName_contains: string;
  lastName_not_contains: string;
  lastName_starts_with: string;
  lastName_not_starts_with: string;
  lastName_ends_with: string;
  lastName_not_ends_with: string;
  dateOfBirth: string;
  dateOfBirth_not: string;
  dateOfBirth_in: string;
  dateOfBirth_not_in: string;
  dateOfBirth_lt: string;
  dateOfBirth_lte: string;
  dateOfBirth_gt: string;
  dateOfBirth_gte: string;
  createdAt: string;
  createdAt_not: string;
  createdAt_in: string;
  createdAt_not_in: string;
  createdAt_lt: string;
  createdAt_lte: string;
  createdAt_gt: string;
  createdAt_gte: string;
  updatedAt: string;
  updatedAt_not: string;
  updatedAt_in: string;
  updatedAt_not_in: string;
  updatedAt_lt: string;
  updatedAt_lte: string;
  updatedAt_gt: string;
  updatedAt_gte: string;
  user: string;
  avatar: string;
}
export interface DocumentWhereInput {
  AND: string;
  OR: string;
  NOT: string;
  id: string;
  id_not: string;
  id_in: string;
  id_not_in: string;
  id_lt: string;
  id_lte: string;
  id_gt: string;
  id_gte: string;
  id_contains: string;
  id_not_contains: string;
  id_starts_with: string;
  id_not_starts_with: string;
  id_ends_with: string;
  id_not_ends_with: string;
  publishDate: string;
  publishDate_not: string;
  publishDate_in: string;
  publishDate_not_in: string;
  publishDate_lt: string;
  publishDate_lte: string;
  publishDate_gt: string;
  publishDate_gte: string;
  title: string;
  title_not: string;
  title_in: string;
  title_not_in: string;
  title_lt: string;
  title_lte: string;
  title_gt: string;
  title_gte: string;
  title_contains: string;
  title_not_contains: string;
  title_starts_with: string;
  title_not_starts_with: string;
  title_ends_with: string;
  title_not_ends_with: string;
  createdAt: string;
  createdAt_not: string;
  createdAt_in: string;
  createdAt_not_in: string;
  createdAt_lt: string;
  createdAt_lte: string;
  createdAt_gt: string;
  createdAt_gte: string;
  updatedAt: string;
  updatedAt_not: string;
  updatedAt_in: string;
  updatedAt_not_in: string;
  updatedAt_lt: string;
  updatedAt_lte: string;
  updatedAt_gt: string;
  updatedAt_gte: string;
  type: string;
  author: string;
}
export interface ProfileCreateWithoutUserInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatar: string;
}
export interface ProfileWhereUniqueInput {
  id: string;
}
export interface DocumentCreateWithoutAuthorInput {
  publishDate: string;
  title: string;
  type: string;
}
export interface DocumentWhereUniqueInput {
  id: string;
}
export interface ProfileUpdateWithoutUserDataInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  avatar: string;
}
export interface ProfileUpsertWithoutUserInput {
  update: string;
  create: string;
}
export interface DocumentUpdateWithWhereUniqueWithoutAuthorInput {
  where: string;
  data: string;
}
export interface DocumentUpsertWithWhereUniqueWithoutAuthorInput {
  where: string;
  update: string;
  create: string;
}
export interface FileWhereInput {
  AND: string;
  OR: string;
  NOT: string;
  id: string;
  id_not: string;
  id_in: string;
  id_not_in: string;
  id_lt: string;
  id_lte: string;
  id_gt: string;
  id_gte: string;
  id_contains: string;
  id_not_contains: string;
  id_starts_with: string;
  id_not_starts_with: string;
  id_ends_with: string;
  id_not_ends_with: string;
  mimetype: string;
  mimetype_not: string;
  mimetype_in: string;
  mimetype_not_in: string;
  mimetype_lt: string;
  mimetype_lte: string;
  mimetype_gt: string;
  mimetype_gte: string;
  mimetype_contains: string;
  mimetype_not_contains: string;
  mimetype_starts_with: string;
  mimetype_not_starts_with: string;
  mimetype_ends_with: string;
  mimetype_not_ends_with: string;
  encoding: string;
  encoding_not: string;
  encoding_in: string;
  encoding_not_in: string;
  encoding_lt: string;
  encoding_lte: string;
  encoding_gt: string;
  encoding_gte: string;
  encoding_contains: string;
  encoding_not_contains: string;
  encoding_starts_with: string;
  encoding_not_starts_with: string;
  encoding_ends_with: string;
  encoding_not_ends_with: string;
  key: string;
  key_not: string;
  key_in: string;
  key_not_in: string;
  key_lt: string;
  key_lte: string;
  key_gt: string;
  key_gte: string;
  key_contains: string;
  key_not_contains: string;
  key_starts_with: string;
  key_not_starts_with: string;
  key_ends_with: string;
  key_not_ends_with: string;
  etag: string;
  etag_not: string;
  etag_in: string;
  etag_not_in: string;
  etag_lt: string;
  etag_lte: string;
  etag_gt: string;
  etag_gte: string;
  etag_contains: string;
  etag_not_contains: string;
  etag_starts_with: string;
  etag_not_starts_with: string;
  etag_ends_with: string;
  etag_not_ends_with: string;
  bucket: string;
  bucket_not: string;
  bucket_in: string;
  bucket_not_in: string;
  bucket_lt: string;
  bucket_lte: string;
  bucket_gt: string;
  bucket_gte: string;
  bucket_contains: string;
  bucket_not_contains: string;
  bucket_starts_with: string;
  bucket_not_starts_with: string;
  bucket_ends_with: string;
  bucket_not_ends_with: string;
  size: number;
  size_not: number;
  size_in: number;
  size_not_in: number;
  size_lt: number;
  size_lte: number;
  size_gt: number;
  size_gte: number;
  createdAt: string;
  createdAt_not: string;
  createdAt_in: string;
  createdAt_not_in: string;
  createdAt_lt: string;
  createdAt_lte: string;
  createdAt_gt: string;
  createdAt_gte: string;
  updatedAt: string;
  updatedAt_not: string;
  updatedAt_in: string;
  updatedAt_not_in: string;
  updatedAt_lt: string;
  updatedAt_lte: string;
  updatedAt_gt: string;
  updatedAt_gte: string;
}
export interface DocumentTypeWhereInput {
  AND: string;
  OR: string;
  NOT: string;
  id: string;
  id_not: string;
  id_in: string;
  id_not_in: string;
  id_lt: string;
  id_lte: string;
  id_gt: string;
  id_gte: string;
  id_contains: string;
  id_not_contains: string;
  id_starts_with: string;
  id_not_starts_with: string;
  id_ends_with: string;
  id_not_ends_with: string;
  title: string;
  title_not: string;
  title_in: string;
  title_not_in: string;
  title_lt: string;
  title_lte: string;
  title_gt: string;
  title_gte: string;
  title_contains: string;
  title_not_contains: string;
  title_starts_with: string;
  title_not_starts_with: string;
  title_ends_with: string;
  title_not_ends_with: string;
  createdAt: string;
  createdAt_not: string;
  createdAt_in: string;
  createdAt_not_in: string;
  createdAt_lt: string;
  createdAt_lte: string;
  createdAt_gt: string;
  createdAt_gte: string;
  updatedAt: string;
  updatedAt_not: string;
  updatedAt_in: string;
  updatedAt_not_in: string;
  updatedAt_lt: string;
  updatedAt_lte: string;
  updatedAt_gt: string;
  updatedAt_gte: string;
  documents_every: string;
  documents_some: string;
  documents_none: string;
}
export interface FileCreateOneInput {
  create: string;
  connect: string;
}
export interface DocumentTypeCreateOneWithoutDocumentsInput {
  create: string;
  connect: string;
}
export interface FileUpdateOneInput {
  create: string;
  connect: string;
  disconnect: boolean;
  delete: boolean;
  update: string;
  upsert: string;
}
export interface DocumentUpdateWithoutAuthorDataInput {
  publishDate: string;
  title: string;
  type: string;
}
export interface FileCreateInput {
  mimetype: string;
  encoding: string;
  key: string;
  etag: string;
  bucket: string;
  size: number;
}
export interface FileWhereUniqueInput {
  id: string;
}
export interface DocumentTypeCreateWithoutDocumentsInput {
  title: string;
}
export interface DocumentTypeWhereUniqueInput {
  id: string;
}
export interface FileUpdateDataInput {
  mimetype: string;
  encoding: string;
  key: string;
  etag: string;
  bucket: string;
  size: number;
}
export interface FileUpsertNestedInput {
  update: string;
  create: string;
}
export interface DocumentTypeUpdateOneWithoutDocumentsInput {
  create: string;
  connect: string;
  delete: boolean;
  update: string;
  upsert: string;
}
export interface DocumentTypeUpdateWithoutDocumentsDataInput {
  title: string;
}
export interface DocumentTypeUpsertWithoutDocumentsInput {
  update: string;
  create: string;
}

export namespace QueryResolvers {
  export type SessionType<T extends ITypeMap> = (
    parent: T['QueryParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['SessionParent'] | null | Promise<T['SessionParent'] | null>;

  export interface ArgsUser {
    where: UserWhereUniqueInput;
  }

  export type UserType<T extends ITypeMap> = (
    parent: T['QueryParent'],
    args: ArgsUser,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | null | Promise<T['UserParent'] | null>;

  export interface ArgsUsers {
    where: UserWhereInput | null;
  }

  export type UsersType<T extends ITypeMap> = (
    parent: T['QueryParent'],
    args: ArgsUsers,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'][] | Promise<T['UserParent'][]>;

  export interface Type<T extends ITypeMap> {
    session: (
      parent: T['QueryParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['SessionParent'] | null | Promise<T['SessionParent'] | null>;
    user: (
      parent: T['QueryParent'],
      args: ArgsUser,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | null | Promise<T['UserParent'] | null>;
    users: (
      parent: T['QueryParent'],
      args: ArgsUsers,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'][] | Promise<T['UserParent'][]>;
  }
}

export namespace MutationResolvers {
  export interface ArgsLogin {
    data: LoginInput;
  }

  export type LoginType<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsLogin,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export interface ArgsUploadFile {
    file: string;
  }

  export type UploadFileType<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsUploadFile,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['FileParent'] | Promise<T['FileParent']>;

  export interface ArgsCreateUser {
    data: UserCreateInput;
  }

  export type CreateUserType<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsCreateUser,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | Promise<T['UserParent']>;

  export interface ArgsDeleteUser {
    where: UserWhereUniqueInput;
  }

  export type DeleteUserType<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsDeleteUser,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | null | Promise<T['UserParent'] | null>;

  export interface ArgsUpdateUser {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }

  export type UpdateUserType<T extends ITypeMap> = (
    parent: T['MutationParent'],
    args: ArgsUpdateUser,
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | null | Promise<T['UserParent'] | null>;

  export interface Type<T extends ITypeMap> {
    login: (
      parent: T['MutationParent'],
      args: ArgsLogin,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
    uploadFile: (
      parent: T['MutationParent'],
      args: ArgsUploadFile,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['FileParent'] | Promise<T['FileParent']>;
    createUser: (
      parent: T['MutationParent'],
      args: ArgsCreateUser,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | Promise<T['UserParent']>;
    deleteUser: (
      parent: T['MutationParent'],
      args: ArgsDeleteUser,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | null | Promise<T['UserParent'] | null>;
    updateUser: (
      parent: T['MutationParent'],
      args: ArgsUpdateUser,
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | null | Promise<T['UserParent'] | null>;
  }
}

export namespace SessionResolvers {
  export type IatType<T extends ITypeMap> = (
    parent: T['SessionParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => number | Promise<number>;

  export type UserType<T extends ITypeMap> = (
    parent: T['SessionParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | Promise<T['UserParent']>;

  export interface Type<T extends ITypeMap> {
    iat: (
      parent: T['SessionParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => number | Promise<number>;
    user: (
      parent: T['SessionParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | Promise<T['UserParent']>;
  }
}

export namespace UserResolvers {
  export type CreatedAtType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type DocumentsType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['DocumentParent'][] | Promise<T['DocumentParent'][]>;

  export type EmailType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type IdType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type LastLoginType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type PasswordType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type ProfileType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['ProfileParent'] | Promise<T['ProfileParent']>;

  export type RoleType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['Role'] | Promise<T['Role']>;

  export type UpdatedAtType<T extends ITypeMap> = (
    parent: T['UserParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export interface Type<T extends ITypeMap> {
    createdAt: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    documents: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['DocumentParent'][] | Promise<T['DocumentParent'][]>;
    email: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    id: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    lastLogin: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
    password: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    profile: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['ProfileParent'] | Promise<T['ProfileParent']>;
    role: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['Role'] | Promise<T['Role']>;
    updatedAt: (
      parent: T['UserParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
  }
}

export namespace ProfileResolvers {
  export type AvatarType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['FileParent'] | null | Promise<T['FileParent'] | null>;

  export type CreatedAtType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type DateOfBirthType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type FirstNameType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type IdType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type LastNameType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type UpdatedAtType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type UserType<T extends ITypeMap> = (
    parent: T['ProfileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | Promise<T['UserParent']>;

  export interface Type<T extends ITypeMap> {
    avatar: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['FileParent'] | null | Promise<T['FileParent'] | null>;
    createdAt: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    dateOfBirth: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
    firstName: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    id: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    lastName: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    updatedAt: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
    user: (
      parent: T['ProfileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | Promise<T['UserParent']>;
  }
}

export namespace DocumentResolvers {
  export type AuthorType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['UserParent'] | Promise<T['UserParent']>;

  export type CreatedAtType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type IdType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type PublishDateType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type TitleType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type TypeType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['DocumentTypeParent'] | Promise<T['DocumentTypeParent']>;

  export type UpdatedAtType<T extends ITypeMap> = (
    parent: T['DocumentParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export interface Type<T extends ITypeMap> {
    author: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['UserParent'] | Promise<T['UserParent']>;
    createdAt: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    id: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    publishDate: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    title: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    type: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['DocumentTypeParent'] | Promise<T['DocumentTypeParent']>;
    updatedAt: (
      parent: T['DocumentParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
  }
}

export namespace DocumentTypeResolvers {
  export type CreatedAtType<T extends ITypeMap> = (
    parent: T['DocumentTypeParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type DocumentsType<T extends ITypeMap> = (
    parent: T['DocumentTypeParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => T['DocumentParent'][] | Promise<T['DocumentParent'][]>;

  export type IdType<T extends ITypeMap> = (
    parent: T['DocumentTypeParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type TitleType<T extends ITypeMap> = (
    parent: T['DocumentTypeParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type UpdatedAtType<T extends ITypeMap> = (
    parent: T['DocumentTypeParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export interface Type<T extends ITypeMap> {
    createdAt: (
      parent: T['DocumentTypeParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    documents: (
      parent: T['DocumentTypeParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => T['DocumentParent'][] | Promise<T['DocumentParent'][]>;
    id: (
      parent: T['DocumentTypeParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    title: (
      parent: T['DocumentTypeParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    updatedAt: (
      parent: T['DocumentTypeParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
  }
}

export namespace FileResolvers {
  export type BucketType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type CreatedAtType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type EncodingType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type EtagType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type IdType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type KeyType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type MimetypeType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export type SizeType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => number | Promise<number>;

  export type UpdatedAtType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | null | Promise<string | null>;

  export type UrlType<T extends ITypeMap> = (
    parent: T['FileParent'],
    args: {},
    ctx: T['Context'],
    info: GraphQLResolveInfo,
  ) => string | Promise<string>;

  export interface Type<T extends ITypeMap> {
    bucket: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    createdAt: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    encoding: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    etag: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    id: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    key: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    mimetype: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
    size: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => number | Promise<number>;
    updatedAt: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | null | Promise<string | null>;
    url: (
      parent: T['FileParent'],
      args: {},
      ctx: T['Context'],
      info: GraphQLResolveInfo,
    ) => string | Promise<string>;
  }
}

export interface IResolvers<T extends ITypeMap> {
  Query: QueryResolvers.Type<T>;
  Mutation: MutationResolvers.Type<T>;
  Session: SessionResolvers.Type<T>;
  User: UserResolvers.Type<T>;
  Profile: ProfileResolvers.Type<T>;
  Document: DocumentResolvers.Type<T>;
  DocumentType: DocumentTypeResolvers.Type<T>;
  File: FileResolvers.Type<T>;
}
