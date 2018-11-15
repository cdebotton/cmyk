export const typeDefs = /* GraphQL */ `type AggregateBlock {
  count: Int!
}

type AggregateDocument {
  count: Int!
}

type AggregateFile {
  count: Int!
}

type AggregateProfile {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Block {
  id: ID!
  name: String!
  document: Document!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type BlockConnection {
  pageInfo: PageInfo!
  edges: [BlockEdge]!
  aggregate: AggregateBlock!
}

input BlockCreateInput {
  name: String!
  document: DocumentCreateOneWithoutBlocksInput!
}

input BlockCreateManyWithoutDocumentInput {
  create: [BlockCreateWithoutDocumentInput!]
  connect: [BlockWhereUniqueInput!]
}

input BlockCreateWithoutDocumentInput {
  name: String!
}

type BlockEdge {
  node: Block!
  cursor: String!
}

enum BlockOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type BlockPreviousValues {
  id: ID!
  name: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type BlockSubscriptionPayload {
  mutation: MutationType!
  node: Block
  updatedFields: [String!]
  previousValues: BlockPreviousValues
}

input BlockSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: BlockWhereInput
  AND: [BlockSubscriptionWhereInput!]
  OR: [BlockSubscriptionWhereInput!]
  NOT: [BlockSubscriptionWhereInput!]
}

input BlockUpdateInput {
  name: String
  document: DocumentUpdateOneRequiredWithoutBlocksInput
}

input BlockUpdateManyMutationInput {
  name: String
}

input BlockUpdateManyWithoutDocumentInput {
  create: [BlockCreateWithoutDocumentInput!]
  delete: [BlockWhereUniqueInput!]
  connect: [BlockWhereUniqueInput!]
  disconnect: [BlockWhereUniqueInput!]
  update: [BlockUpdateWithWhereUniqueWithoutDocumentInput!]
  upsert: [BlockUpsertWithWhereUniqueWithoutDocumentInput!]
}

input BlockUpdateWithoutDocumentDataInput {
  name: String
}

input BlockUpdateWithWhereUniqueWithoutDocumentInput {
  where: BlockWhereUniqueInput!
  data: BlockUpdateWithoutDocumentDataInput!
}

input BlockUpsertWithWhereUniqueWithoutDocumentInput {
  where: BlockWhereUniqueInput!
  update: BlockUpdateWithoutDocumentDataInput!
  create: BlockCreateWithoutDocumentInput!
}

input BlockWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  document: DocumentWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [BlockWhereInput!]
  OR: [BlockWhereInput!]
  NOT: [BlockWhereInput!]
}

input BlockWhereUniqueInput {
  id: ID
}

scalar DateTime

type Document {
  id: ID!
  publishDate: DateTime!
  title: String!
  author: User!
  blocks(where: BlockWhereInput, orderBy: BlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Block!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DocumentConnection {
  pageInfo: PageInfo!
  edges: [DocumentEdge]!
  aggregate: AggregateDocument!
}

input DocumentCreateInput {
  publishDate: DateTime!
  title: String!
  author: UserCreateOneWithoutDocumentsInput!
  blocks: BlockCreateManyWithoutDocumentInput
}

input DocumentCreateManyWithoutAuthorInput {
  create: [DocumentCreateWithoutAuthorInput!]
  connect: [DocumentWhereUniqueInput!]
}

input DocumentCreateOneWithoutBlocksInput {
  create: DocumentCreateWithoutBlocksInput
  connect: DocumentWhereUniqueInput
}

input DocumentCreateWithoutAuthorInput {
  publishDate: DateTime!
  title: String!
  blocks: BlockCreateManyWithoutDocumentInput
}

input DocumentCreateWithoutBlocksInput {
  publishDate: DateTime!
  title: String!
  author: UserCreateOneWithoutDocumentsInput!
}

type DocumentEdge {
  node: Document!
  cursor: String!
}

enum DocumentOrderByInput {
  id_ASC
  id_DESC
  publishDate_ASC
  publishDate_DESC
  title_ASC
  title_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DocumentPreviousValues {
  id: ID!
  publishDate: DateTime!
  title: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DocumentSubscriptionPayload {
  mutation: MutationType!
  node: Document
  updatedFields: [String!]
  previousValues: DocumentPreviousValues
}

input DocumentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DocumentWhereInput
  AND: [DocumentSubscriptionWhereInput!]
  OR: [DocumentSubscriptionWhereInput!]
  NOT: [DocumentSubscriptionWhereInput!]
}

input DocumentUpdateInput {
  publishDate: DateTime
  title: String
  author: UserUpdateOneRequiredWithoutDocumentsInput
  blocks: BlockUpdateManyWithoutDocumentInput
}

input DocumentUpdateManyMutationInput {
  publishDate: DateTime
  title: String
}

input DocumentUpdateManyWithoutAuthorInput {
  create: [DocumentCreateWithoutAuthorInput!]
  delete: [DocumentWhereUniqueInput!]
  connect: [DocumentWhereUniqueInput!]
  disconnect: [DocumentWhereUniqueInput!]
  update: [DocumentUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [DocumentUpsertWithWhereUniqueWithoutAuthorInput!]
}

input DocumentUpdateOneRequiredWithoutBlocksInput {
  create: DocumentCreateWithoutBlocksInput
  update: DocumentUpdateWithoutBlocksDataInput
  upsert: DocumentUpsertWithoutBlocksInput
  connect: DocumentWhereUniqueInput
}

input DocumentUpdateWithoutAuthorDataInput {
  publishDate: DateTime
  title: String
  blocks: BlockUpdateManyWithoutDocumentInput
}

input DocumentUpdateWithoutBlocksDataInput {
  publishDate: DateTime
  title: String
  author: UserUpdateOneRequiredWithoutDocumentsInput
}

input DocumentUpdateWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput!
  data: DocumentUpdateWithoutAuthorDataInput!
}

input DocumentUpsertWithoutBlocksInput {
  update: DocumentUpdateWithoutBlocksDataInput!
  create: DocumentCreateWithoutBlocksInput!
}

input DocumentUpsertWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput!
  update: DocumentUpdateWithoutAuthorDataInput!
  create: DocumentCreateWithoutAuthorInput!
}

input DocumentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  publishDate: DateTime
  publishDate_not: DateTime
  publishDate_in: [DateTime!]
  publishDate_not_in: [DateTime!]
  publishDate_lt: DateTime
  publishDate_lte: DateTime
  publishDate_gt: DateTime
  publishDate_gte: DateTime
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  author: UserWhereInput
  blocks_every: BlockWhereInput
  blocks_some: BlockWhereInput
  blocks_none: BlockWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [DocumentWhereInput!]
  OR: [DocumentWhereInput!]
  NOT: [DocumentWhereInput!]
}

input DocumentWhereUniqueInput {
  id: ID
}

type File {
  id: ID!
  mimetype: String!
  encoding: String!
  key: String!
  etag: String!
  bucket: String!
  size: Int!
  url: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type FileConnection {
  pageInfo: PageInfo!
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  mimetype: String!
  encoding: String!
  key: String!
  etag: String!
  bucket: String!
  size: Int!
  url: String!
}

input FileCreateOneInput {
  create: FileCreateInput
  connect: FileWhereUniqueInput
}

type FileEdge {
  node: File!
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  mimetype_ASC
  mimetype_DESC
  encoding_ASC
  encoding_DESC
  key_ASC
  key_DESC
  etag_ASC
  etag_DESC
  bucket_ASC
  bucket_DESC
  size_ASC
  size_DESC
  url_ASC
  url_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FilePreviousValues {
  id: ID!
  mimetype: String!
  encoding: String!
  key: String!
  etag: String!
  bucket: String!
  size: Int!
  url: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: FileWhereInput
  AND: [FileSubscriptionWhereInput!]
  OR: [FileSubscriptionWhereInput!]
  NOT: [FileSubscriptionWhereInput!]
}

input FileUpdateDataInput {
  mimetype: String
  encoding: String
  key: String
  etag: String
  bucket: String
  size: Int
  url: String
}

input FileUpdateInput {
  mimetype: String
  encoding: String
  key: String
  etag: String
  bucket: String
  size: Int
  url: String
}

input FileUpdateManyMutationInput {
  mimetype: String
  encoding: String
  key: String
  etag: String
  bucket: String
  size: Int
  url: String
}

input FileUpdateOneInput {
  create: FileCreateInput
  update: FileUpdateDataInput
  upsert: FileUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: FileWhereUniqueInput
}

input FileUpsertNestedInput {
  update: FileUpdateDataInput!
  create: FileCreateInput!
}

input FileWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  mimetype: String
  mimetype_not: String
  mimetype_in: [String!]
  mimetype_not_in: [String!]
  mimetype_lt: String
  mimetype_lte: String
  mimetype_gt: String
  mimetype_gte: String
  mimetype_contains: String
  mimetype_not_contains: String
  mimetype_starts_with: String
  mimetype_not_starts_with: String
  mimetype_ends_with: String
  mimetype_not_ends_with: String
  encoding: String
  encoding_not: String
  encoding_in: [String!]
  encoding_not_in: [String!]
  encoding_lt: String
  encoding_lte: String
  encoding_gt: String
  encoding_gte: String
  encoding_contains: String
  encoding_not_contains: String
  encoding_starts_with: String
  encoding_not_starts_with: String
  encoding_ends_with: String
  encoding_not_ends_with: String
  key: String
  key_not: String
  key_in: [String!]
  key_not_in: [String!]
  key_lt: String
  key_lte: String
  key_gt: String
  key_gte: String
  key_contains: String
  key_not_contains: String
  key_starts_with: String
  key_not_starts_with: String
  key_ends_with: String
  key_not_ends_with: String
  etag: String
  etag_not: String
  etag_in: [String!]
  etag_not_in: [String!]
  etag_lt: String
  etag_lte: String
  etag_gt: String
  etag_gte: String
  etag_contains: String
  etag_not_contains: String
  etag_starts_with: String
  etag_not_starts_with: String
  etag_ends_with: String
  etag_not_ends_with: String
  bucket: String
  bucket_not: String
  bucket_in: [String!]
  bucket_not_in: [String!]
  bucket_lt: String
  bucket_lte: String
  bucket_gt: String
  bucket_gte: String
  bucket_contains: String
  bucket_not_contains: String
  bucket_starts_with: String
  bucket_not_starts_with: String
  bucket_ends_with: String
  bucket_not_ends_with: String
  size: Int
  size_not: Int
  size_in: [Int!]
  size_not_in: [Int!]
  size_lt: Int
  size_lte: Int
  size_gt: Int
  size_gte: Int
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  AND: [FileWhereInput!]
  OR: [FileWhereInput!]
  NOT: [FileWhereInput!]
}

input FileWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createBlock(data: BlockCreateInput!): Block!
  updateBlock(data: BlockUpdateInput!, where: BlockWhereUniqueInput!): Block
  updateManyBlocks(data: BlockUpdateManyMutationInput!, where: BlockWhereInput): BatchPayload!
  upsertBlock(where: BlockWhereUniqueInput!, create: BlockCreateInput!, update: BlockUpdateInput!): Block!
  deleteBlock(where: BlockWhereUniqueInput!): Block
  deleteManyBlocks(where: BlockWhereInput): BatchPayload!
  createDocument(data: DocumentCreateInput!): Document!
  updateDocument(data: DocumentUpdateInput!, where: DocumentWhereUniqueInput!): Document
  updateManyDocuments(data: DocumentUpdateManyMutationInput!, where: DocumentWhereInput): BatchPayload!
  upsertDocument(where: DocumentWhereUniqueInput!, create: DocumentCreateInput!, update: DocumentUpdateInput!): Document!
  deleteDocument(where: DocumentWhereUniqueInput!): Document
  deleteManyDocuments(where: DocumentWhereInput): BatchPayload!
  createFile(data: FileCreateInput!): File!
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  updateManyFiles(data: FileUpdateManyMutationInput!, where: FileWhereInput): BatchPayload!
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  deleteFile(where: FileWhereUniqueInput!): File
  deleteManyFiles(where: FileWhereInput): BatchPayload!
  createProfile(data: ProfileCreateInput!): Profile!
  updateProfile(data: ProfileUpdateInput!, where: ProfileWhereUniqueInput!): Profile
  updateManyProfiles(data: ProfileUpdateManyMutationInput!, where: ProfileWhereInput): BatchPayload!
  upsertProfile(where: ProfileWhereUniqueInput!, create: ProfileCreateInput!, update: ProfileUpdateInput!): Profile!
  deleteProfile(where: ProfileWhereUniqueInput!): Profile
  deleteManyProfiles(where: ProfileWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Profile {
  id: ID!
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
  user: User!
  avatar: File
}

type ProfileConnection {
  pageInfo: PageInfo!
  edges: [ProfileEdge]!
  aggregate: AggregateProfile!
}

input ProfileCreateInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  user: UserCreateOneWithoutProfileInput!
  avatar: FileCreateOneInput
}

input ProfileCreateOneWithoutUserInput {
  create: ProfileCreateWithoutUserInput
  connect: ProfileWhereUniqueInput
}

input ProfileCreateWithoutUserInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  avatar: FileCreateOneInput
}

type ProfileEdge {
  node: Profile!
  cursor: String!
}

enum ProfileOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  dateOfBirth_ASC
  dateOfBirth_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ProfilePreviousValues {
  id: ID!
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ProfileSubscriptionPayload {
  mutation: MutationType!
  node: Profile
  updatedFields: [String!]
  previousValues: ProfilePreviousValues
}

input ProfileSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProfileWhereInput
  AND: [ProfileSubscriptionWhereInput!]
  OR: [ProfileSubscriptionWhereInput!]
  NOT: [ProfileSubscriptionWhereInput!]
}

input ProfileUpdateInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  user: UserUpdateOneRequiredWithoutProfileInput
  avatar: FileUpdateOneInput
}

input ProfileUpdateManyMutationInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
}

input ProfileUpdateOneRequiredWithoutUserInput {
  create: ProfileCreateWithoutUserInput
  update: ProfileUpdateWithoutUserDataInput
  upsert: ProfileUpsertWithoutUserInput
  connect: ProfileWhereUniqueInput
}

input ProfileUpdateWithoutUserDataInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  avatar: FileUpdateOneInput
}

input ProfileUpsertWithoutUserInput {
  update: ProfileUpdateWithoutUserDataInput!
  create: ProfileCreateWithoutUserInput!
}

input ProfileWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  dateOfBirth: DateTime
  dateOfBirth_not: DateTime
  dateOfBirth_in: [DateTime!]
  dateOfBirth_not_in: [DateTime!]
  dateOfBirth_lt: DateTime
  dateOfBirth_lte: DateTime
  dateOfBirth_gt: DateTime
  dateOfBirth_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  user: UserWhereInput
  avatar: FileWhereInput
  AND: [ProfileWhereInput!]
  OR: [ProfileWhereInput!]
  NOT: [ProfileWhereInput!]
}

input ProfileWhereUniqueInput {
  id: ID
}

type Query {
  block(where: BlockWhereUniqueInput!): Block
  blocks(where: BlockWhereInput, orderBy: BlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Block]!
  blocksConnection(where: BlockWhereInput, orderBy: BlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): BlockConnection!
  document(where: DocumentWhereUniqueInput!): Document
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document]!
  documentsConnection(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DocumentConnection!
  file(where: FileWhereUniqueInput!): File
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!
  profile(where: ProfileWhereUniqueInput!): Profile
  profiles(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Profile]!
  profilesConnection(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProfileConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  EDITOR
  USER
  VIEWER
  UNAUTHORIZED
}

type Subscription {
  block(where: BlockSubscriptionWhereInput): BlockSubscriptionPayload
  document(where: DocumentSubscriptionWhereInput): DocumentSubscriptionPayload
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
  profile(where: ProfileSubscriptionWhereInput): ProfileSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  email: String!
  password: String!
  lastLogin: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
  role: Role!
  profile: Profile!
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  lastLogin: DateTime
  role: Role
  profile: ProfileCreateOneWithoutUserInput!
  documents: DocumentCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutDocumentsInput {
  create: UserCreateWithoutDocumentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutDocumentsInput {
  email: String!
  password: String!
  lastLogin: DateTime
  role: Role
  profile: ProfileCreateOneWithoutUserInput!
}

input UserCreateWithoutProfileInput {
  email: String!
  password: String!
  lastLogin: DateTime
  role: Role
  documents: DocumentCreateManyWithoutAuthorInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  lastLogin_ASC
  lastLogin_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  role_ASC
  role_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  lastLogin: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
  role: Role!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  lastLogin: DateTime
  role: Role
  profile: ProfileUpdateOneRequiredWithoutUserInput
  documents: DocumentUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  lastLogin: DateTime
  role: Role
}

input UserUpdateOneRequiredWithoutDocumentsInput {
  create: UserCreateWithoutDocumentsInput
  update: UserUpdateWithoutDocumentsDataInput
  upsert: UserUpsertWithoutDocumentsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  update: UserUpdateWithoutProfileDataInput
  upsert: UserUpsertWithoutProfileInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutDocumentsDataInput {
  email: String
  password: String
  lastLogin: DateTime
  role: Role
  profile: ProfileUpdateOneRequiredWithoutUserInput
}

input UserUpdateWithoutProfileDataInput {
  email: String
  password: String
  lastLogin: DateTime
  role: Role
  documents: DocumentUpdateManyWithoutAuthorInput
}

input UserUpsertWithoutDocumentsInput {
  update: UserUpdateWithoutDocumentsDataInput!
  create: UserCreateWithoutDocumentsInput!
}

input UserUpsertWithoutProfileInput {
  update: UserUpdateWithoutProfileDataInput!
  create: UserCreateWithoutProfileInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  lastLogin: DateTime
  lastLogin_not: DateTime
  lastLogin_in: [DateTime!]
  lastLogin_not_in: [DateTime!]
  lastLogin_lt: DateTime
  lastLogin_lte: DateTime
  lastLogin_gt: DateTime
  lastLogin_gte: DateTime
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  profile: ProfileWhereInput
  documents_every: DocumentWhereInput
  documents_some: DocumentWhereInput
  documents_none: DocumentWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`