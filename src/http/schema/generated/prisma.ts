import { Prisma as BasePrisma, BasePrismaOptions } from 'prisma-binding'
import { GraphQLResolveInfo } from 'graphql'

export const typeDefs = `
type AggregateDocument {
  count: Int!
}

type AggregateDocumentType {
  count: Int!
}

type AggregateProfile {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """
  The number of nodes that have been affected by the Batch operation.
  """
  count: Long!
}

scalar DateTime

type Document implements Node {
  id: ID!
  publishDate: DateTime!
  title: String!
  type(where: DocumentTypeWhereInput): DocumentType!
  author(where: UserWhereInput): User
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type DocumentConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [DocumentEdge]!
  aggregate: AggregateDocument!
}

input DocumentCreateInput {
  publishDate: DateTime!
  title: String!
  type: DocumentTypeCreateOneWithoutDocumentsInput!
  author: UserCreateOneWithoutDocumentsInput
}

input DocumentCreateManyWithoutAuthorInput {
  create: [DocumentCreateWithoutAuthorInput!]
  connect: [DocumentWhereUniqueInput!]
}

input DocumentCreateManyWithoutTypeInput {
  create: [DocumentCreateWithoutTypeInput!]
  connect: [DocumentWhereUniqueInput!]
}

input DocumentCreateWithoutAuthorInput {
  publishDate: DateTime!
  title: String!
  type: DocumentTypeCreateOneWithoutDocumentsInput!
}

input DocumentCreateWithoutTypeInput {
  publishDate: DateTime!
  title: String!
  author: UserCreateOneWithoutDocumentsInput
}

"""
An edge in a connection.
"""
type DocumentEdge {
  """
  The item at the end of the edge.
  """
  node: Document!
  """
  A cursor for use in pagination.
  """
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
  """
  Logical AND on all given filters.
  """
  AND: [DocumentSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [DocumentSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [DocumentSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DocumentWhereInput
}

type DocumentType implements Node {
  id: ID!
  title: String!
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type DocumentTypeConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [DocumentTypeEdge]!
  aggregate: AggregateDocumentType!
}

input DocumentTypeCreateInput {
  title: String!
  documents: DocumentCreateManyWithoutTypeInput
}

input DocumentTypeCreateOneWithoutDocumentsInput {
  create: DocumentTypeCreateWithoutDocumentsInput
  connect: DocumentTypeWhereUniqueInput
}

input DocumentTypeCreateWithoutDocumentsInput {
  title: String!
}

"""
An edge in a connection.
"""
type DocumentTypeEdge {
  """
  The item at the end of the edge.
  """
  node: DocumentType!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum DocumentTypeOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DocumentTypePreviousValues {
  id: ID!
  title: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DocumentTypeSubscriptionPayload {
  mutation: MutationType!
  node: DocumentType
  updatedFields: [String!]
  previousValues: DocumentTypePreviousValues
}

input DocumentTypeSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [DocumentTypeSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [DocumentTypeSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [DocumentTypeSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DocumentTypeWhereInput
}

input DocumentTypeUpdateInput {
  title: String
  documents: DocumentUpdateManyWithoutTypeInput
}

input DocumentTypeUpdateOneWithoutDocumentsInput {
  create: DocumentTypeCreateWithoutDocumentsInput
  connect: DocumentTypeWhereUniqueInput
  delete: Boolean
  update: DocumentTypeUpdateWithoutDocumentsDataInput
  upsert: DocumentTypeUpsertWithoutDocumentsInput
}

input DocumentTypeUpdateWithoutDocumentsDataInput {
  title: String
}

input DocumentTypeUpsertWithoutDocumentsInput {
  update: DocumentTypeUpdateWithoutDocumentsDataInput!
  create: DocumentTypeCreateWithoutDocumentsInput!
}

input DocumentTypeWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [DocumentTypeWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [DocumentTypeWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [DocumentTypeWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  documents_every: DocumentWhereInput
  documents_some: DocumentWhereInput
  documents_none: DocumentWhereInput
}

input DocumentTypeWhereUniqueInput {
  id: ID
}

input DocumentUpdateInput {
  publishDate: DateTime
  title: String
  type: DocumentTypeUpdateOneWithoutDocumentsInput
  author: UserUpdateOneWithoutDocumentsInput
}

input DocumentUpdateManyWithoutAuthorInput {
  create: [DocumentCreateWithoutAuthorInput!]
  connect: [DocumentWhereUniqueInput!]
  disconnect: [DocumentWhereUniqueInput!]
  delete: [DocumentWhereUniqueInput!]
  update: [DocumentUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [DocumentUpsertWithWhereUniqueWithoutAuthorInput!]
}

input DocumentUpdateManyWithoutTypeInput {
  create: [DocumentCreateWithoutTypeInput!]
  connect: [DocumentWhereUniqueInput!]
  disconnect: [DocumentWhereUniqueInput!]
  delete: [DocumentWhereUniqueInput!]
  update: [DocumentUpdateWithWhereUniqueWithoutTypeInput!]
  upsert: [DocumentUpsertWithWhereUniqueWithoutTypeInput!]
}

input DocumentUpdateWithoutAuthorDataInput {
  publishDate: DateTime
  title: String
  type: DocumentTypeUpdateOneWithoutDocumentsInput
}

input DocumentUpdateWithoutTypeDataInput {
  publishDate: DateTime
  title: String
  author: UserUpdateOneWithoutDocumentsInput
}

input DocumentUpdateWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput!
  data: DocumentUpdateWithoutAuthorDataInput!
}

input DocumentUpdateWithWhereUniqueWithoutTypeInput {
  where: DocumentWhereUniqueInput!
  data: DocumentUpdateWithoutTypeDataInput!
}

input DocumentUpsertWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput!
  update: DocumentUpdateWithoutAuthorDataInput!
  create: DocumentCreateWithoutAuthorInput!
}

input DocumentUpsertWithWhereUniqueWithoutTypeInput {
  where: DocumentWhereUniqueInput!
  update: DocumentUpdateWithoutTypeDataInput!
  create: DocumentCreateWithoutTypeInput!
}

input DocumentWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [DocumentWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [DocumentWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [DocumentWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  publishDate: DateTime
  """
  All values that are not equal to given value.
  """
  publishDate_not: DateTime
  """
  All values that are contained in given list.
  """
  publishDate_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  publishDate_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  publishDate_lt: DateTime
  """
  All values less than or equal the given value.
  """
  publishDate_lte: DateTime
  """
  All values greater than the given value.
  """
  publishDate_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  publishDate_gte: DateTime
  title: String
  """
  All values that are not equal to given value.
  """
  title_not: String
  """
  All values that are contained in given list.
  """
  title_in: [String!]
  """
  All values that are not contained in given list.
  """
  title_not_in: [String!]
  """
  All values less than the given value.
  """
  title_lt: String
  """
  All values less than or equal the given value.
  """
  title_lte: String
  """
  All values greater than the given value.
  """
  title_gt: String
  """
  All values greater than or equal the given value.
  """
  title_gte: String
  """
  All values containing the given string.
  """
  title_contains: String
  """
  All values not containing the given string.
  """
  title_not_contains: String
  """
  All values starting with the given string.
  """
  title_starts_with: String
  """
  All values not starting with the given string.
  """
  title_not_starts_with: String
  """
  All values ending with the given string.
  """
  title_ends_with: String
  """
  All values not ending with the given string.
  """
  title_not_ends_with: String
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  type: DocumentTypeWhereInput
  author: UserWhereInput
}

input DocumentWhereUniqueInput {
  id: ID
}

"""
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""
An object with an ID
"""
interface Node {
  """
  The id of the object.
  """
  id: ID!
}

"""
Information about pagination in a connection.
"""
type PageInfo {
  """
  When paginating forwards, are there more items?
  """
  hasNextPage: Boolean!
  """
  When paginating backwards, are there more items?
  """
  hasPreviousPage: Boolean!
  """
  When paginating backwards, the cursor to continue.
  """
  startCursor: String
  """
  When paginating forwards, the cursor to continue.
  """
  endCursor: String
}

type Profile implements Node {
  id: ID!
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  user(where: UserWhereInput): User!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type ProfileConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [ProfileEdge]!
  aggregate: AggregateProfile!
}

input ProfileCreateInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  user: UserCreateOneWithoutProfileInput!
}

input ProfileCreateOneWithoutUserInput {
  create: ProfileCreateWithoutUserInput
  connect: ProfileWhereUniqueInput
}

input ProfileCreateWithoutUserInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
}

"""
An edge in a connection.
"""
type ProfileEdge {
  """
  The item at the end of the edge.
  """
  node: Profile!
  """
  A cursor for use in pagination.
  """
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
  """
  Logical AND on all given filters.
  """
  AND: [ProfileSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProfileSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ProfileSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ProfileWhereInput
}

input ProfileUpdateInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
  user: UserUpdateOneWithoutProfileInput
}

input ProfileUpdateOneWithoutUserInput {
  create: ProfileCreateWithoutUserInput
  connect: ProfileWhereUniqueInput
  delete: Boolean
  update: ProfileUpdateWithoutUserDataInput
  upsert: ProfileUpsertWithoutUserInput
}

input ProfileUpdateWithoutUserDataInput {
  firstName: String
  lastName: String
  dateOfBirth: DateTime
}

input ProfileUpsertWithoutUserInput {
  update: ProfileUpdateWithoutUserDataInput!
  create: ProfileCreateWithoutUserInput!
}

input ProfileWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [ProfileWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [ProfileWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [ProfileWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  firstName: String
  """
  All values that are not equal to given value.
  """
  firstName_not: String
  """
  All values that are contained in given list.
  """
  firstName_in: [String!]
  """
  All values that are not contained in given list.
  """
  firstName_not_in: [String!]
  """
  All values less than the given value.
  """
  firstName_lt: String
  """
  All values less than or equal the given value.
  """
  firstName_lte: String
  """
  All values greater than the given value.
  """
  firstName_gt: String
  """
  All values greater than or equal the given value.
  """
  firstName_gte: String
  """
  All values containing the given string.
  """
  firstName_contains: String
  """
  All values not containing the given string.
  """
  firstName_not_contains: String
  """
  All values starting with the given string.
  """
  firstName_starts_with: String
  """
  All values not starting with the given string.
  """
  firstName_not_starts_with: String
  """
  All values ending with the given string.
  """
  firstName_ends_with: String
  """
  All values not ending with the given string.
  """
  firstName_not_ends_with: String
  lastName: String
  """
  All values that are not equal to given value.
  """
  lastName_not: String
  """
  All values that are contained in given list.
  """
  lastName_in: [String!]
  """
  All values that are not contained in given list.
  """
  lastName_not_in: [String!]
  """
  All values less than the given value.
  """
  lastName_lt: String
  """
  All values less than or equal the given value.
  """
  lastName_lte: String
  """
  All values greater than the given value.
  """
  lastName_gt: String
  """
  All values greater than or equal the given value.
  """
  lastName_gte: String
  """
  All values containing the given string.
  """
  lastName_contains: String
  """
  All values not containing the given string.
  """
  lastName_not_contains: String
  """
  All values starting with the given string.
  """
  lastName_starts_with: String
  """
  All values not starting with the given string.
  """
  lastName_not_starts_with: String
  """
  All values ending with the given string.
  """
  lastName_ends_with: String
  """
  All values not ending with the given string.
  """
  lastName_not_ends_with: String
  dateOfBirth: DateTime
  """
  All values that are not equal to given value.
  """
  dateOfBirth_not: DateTime
  """
  All values that are contained in given list.
  """
  dateOfBirth_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  dateOfBirth_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  dateOfBirth_lt: DateTime
  """
  All values less than or equal the given value.
  """
  dateOfBirth_lte: DateTime
  """
  All values greater than the given value.
  """
  dateOfBirth_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  dateOfBirth_gte: DateTime
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  user: UserWhereInput
}

input ProfileWhereUniqueInput {
  id: ID
}

enum Role {
  ADMIN
  EDITOR
  USER
  UNAUTHORIZED
}

type User implements Node {
  id: ID!
  email: String!
  password: String!
  role: Role!
  profile(where: ProfileWhereInput): Profile!
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document!]
  lastLogin: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""
A connection to a list of items.
"""
type UserConnection {
  """
  Information to aid in pagination.
  """
  pageInfo: PageInfo!
  """
  A list of edges.
  """
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String!
  role: Role
  lastLogin: DateTime
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
  role: Role
  lastLogin: DateTime
  profile: ProfileCreateOneWithoutUserInput!
}

input UserCreateWithoutProfileInput {
  email: String!
  password: String!
  role: Role
  lastLogin: DateTime
  documents: DocumentCreateManyWithoutAuthorInput
}

"""
An edge in a connection.
"""
type UserEdge {
  """
  The item at the end of the edge.
  """
  node: User!
  """
  A cursor for use in pagination.
  """
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
  lastLogin_ASC
  lastLogin_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String!
  role: Role!
  lastLogin: DateTime
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """
  Logical AND on all given filters.
  """
  AND: [UserSubscriptionWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserSubscriptionWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserSubscriptionWhereInput!]
  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]
  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String
  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]
  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  role: Role
  lastLogin: DateTime
  profile: ProfileUpdateOneWithoutUserInput
  documents: DocumentUpdateManyWithoutAuthorInput
}

input UserUpdateOneWithoutDocumentsInput {
  create: UserCreateWithoutDocumentsInput
  connect: UserWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: UserUpdateWithoutDocumentsDataInput
  upsert: UserUpsertWithoutDocumentsInput
}

input UserUpdateOneWithoutProfileInput {
  create: UserCreateWithoutProfileInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutProfileDataInput
  upsert: UserUpsertWithoutProfileInput
}

input UserUpdateWithoutDocumentsDataInput {
  email: String
  password: String
  role: Role
  lastLogin: DateTime
  profile: ProfileUpdateOneWithoutUserInput
}

input UserUpdateWithoutProfileDataInput {
  email: String
  password: String
  role: Role
  lastLogin: DateTime
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
  """
  Logical AND on all given filters.
  """
  AND: [UserWhereInput!]
  """
  Logical OR on all given filters.
  """
  OR: [UserWhereInput!]
  """
  Logical NOT on all given filters combined by AND.
  """
  NOT: [UserWhereInput!]
  id: ID
  """
  All values that are not equal to given value.
  """
  id_not: ID
  """
  All values that are contained in given list.
  """
  id_in: [ID!]
  """
  All values that are not contained in given list.
  """
  id_not_in: [ID!]
  """
  All values less than the given value.
  """
  id_lt: ID
  """
  All values less than or equal the given value.
  """
  id_lte: ID
  """
  All values greater than the given value.
  """
  id_gt: ID
  """
  All values greater than or equal the given value.
  """
  id_gte: ID
  """
  All values containing the given string.
  """
  id_contains: ID
  """
  All values not containing the given string.
  """
  id_not_contains: ID
  """
  All values starting with the given string.
  """
  id_starts_with: ID
  """
  All values not starting with the given string.
  """
  id_not_starts_with: ID
  """
  All values ending with the given string.
  """
  id_ends_with: ID
  """
  All values not ending with the given string.
  """
  id_not_ends_with: ID
  email: String
  """
  All values that are not equal to given value.
  """
  email_not: String
  """
  All values that are contained in given list.
  """
  email_in: [String!]
  """
  All values that are not contained in given list.
  """
  email_not_in: [String!]
  """
  All values less than the given value.
  """
  email_lt: String
  """
  All values less than or equal the given value.
  """
  email_lte: String
  """
  All values greater than the given value.
  """
  email_gt: String
  """
  All values greater than or equal the given value.
  """
  email_gte: String
  """
  All values containing the given string.
  """
  email_contains: String
  """
  All values not containing the given string.
  """
  email_not_contains: String
  """
  All values starting with the given string.
  """
  email_starts_with: String
  """
  All values not starting with the given string.
  """
  email_not_starts_with: String
  """
  All values ending with the given string.
  """
  email_ends_with: String
  """
  All values not ending with the given string.
  """
  email_not_ends_with: String
  password: String
  """
  All values that are not equal to given value.
  """
  password_not: String
  """
  All values that are contained in given list.
  """
  password_in: [String!]
  """
  All values that are not contained in given list.
  """
  password_not_in: [String!]
  """
  All values less than the given value.
  """
  password_lt: String
  """
  All values less than or equal the given value.
  """
  password_lte: String
  """
  All values greater than the given value.
  """
  password_gt: String
  """
  All values greater than or equal the given value.
  """
  password_gte: String
  """
  All values containing the given string.
  """
  password_contains: String
  """
  All values not containing the given string.
  """
  password_not_contains: String
  """
  All values starting with the given string.
  """
  password_starts_with: String
  """
  All values not starting with the given string.
  """
  password_not_starts_with: String
  """
  All values ending with the given string.
  """
  password_ends_with: String
  """
  All values not ending with the given string.
  """
  password_not_ends_with: String
  role: Role
  """
  All values that are not equal to given value.
  """
  role_not: Role
  """
  All values that are contained in given list.
  """
  role_in: [Role!]
  """
  All values that are not contained in given list.
  """
  role_not_in: [Role!]
  lastLogin: DateTime
  """
  All values that are not equal to given value.
  """
  lastLogin_not: DateTime
  """
  All values that are contained in given list.
  """
  lastLogin_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  lastLogin_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  lastLogin_lt: DateTime
  """
  All values less than or equal the given value.
  """
  lastLogin_lte: DateTime
  """
  All values greater than the given value.
  """
  lastLogin_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  lastLogin_gte: DateTime
  createdAt: DateTime
  """
  All values that are not equal to given value.
  """
  createdAt_not: DateTime
  """
  All values that are contained in given list.
  """
  createdAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  createdAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  createdAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  createdAt_lte: DateTime
  """
  All values greater than the given value.
  """
  createdAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  createdAt_gte: DateTime
  updatedAt: DateTime
  """
  All values that are not equal to given value.
  """
  updatedAt_not: DateTime
  """
  All values that are contained in given list.
  """
  updatedAt_in: [DateTime!]
  """
  All values that are not contained in given list.
  """
  updatedAt_not_in: [DateTime!]
  """
  All values less than the given value.
  """
  updatedAt_lt: DateTime
  """
  All values less than or equal the given value.
  """
  updatedAt_lte: DateTime
  """
  All values greater than the given value.
  """
  updatedAt_gt: DateTime
  """
  All values greater than or equal the given value.
  """
  updatedAt_gte: DateTime
  profile: ProfileWhereInput
  documents_every: DocumentWhereInput
  documents_some: DocumentWhereInput
  documents_none: DocumentWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}

type Mutation {
  createUser(data: UserCreateInput!): User!
  createProfile(data: ProfileCreateInput!): Profile!
  createDocumentType(data: DocumentTypeCreateInput!): DocumentType!
  createDocument(data: DocumentCreateInput!): Document!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateProfile(data: ProfileUpdateInput!, where: ProfileWhereUniqueInput!): Profile
  updateDocumentType(data: DocumentTypeUpdateInput!, where: DocumentTypeWhereUniqueInput!): DocumentType
  updateDocument(data: DocumentUpdateInput!, where: DocumentWhereUniqueInput!): Document
  deleteUser(where: UserWhereUniqueInput!): User
  deleteProfile(where: ProfileWhereUniqueInput!): Profile
  deleteDocumentType(where: DocumentTypeWhereUniqueInput!): DocumentType
  deleteDocument(where: DocumentWhereUniqueInput!): Document
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertProfile(where: ProfileWhereUniqueInput!, create: ProfileCreateInput!, update: ProfileUpdateInput!): Profile!
  upsertDocumentType(where: DocumentTypeWhereUniqueInput!, create: DocumentTypeCreateInput!, update: DocumentTypeUpdateInput!): DocumentType!
  upsertDocument(where: DocumentWhereUniqueInput!, create: DocumentCreateInput!, update: DocumentUpdateInput!): Document!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyProfiles(data: ProfileUpdateInput!, where: ProfileWhereInput): BatchPayload!
  updateManyDocumentTypes(data: DocumentTypeUpdateInput!, where: DocumentTypeWhereInput): BatchPayload!
  updateManyDocuments(data: DocumentUpdateInput!, where: DocumentWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyProfiles(where: ProfileWhereInput): BatchPayload!
  deleteManyDocumentTypes(where: DocumentTypeWhereInput): BatchPayload!
  deleteManyDocuments(where: DocumentWhereInput): BatchPayload!
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  profiles(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Profile]!
  documentTypes(where: DocumentTypeWhereInput, orderBy: DocumentTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DocumentType]!
  documents(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Document]!
  user(where: UserWhereUniqueInput!): User
  profile(where: ProfileWhereUniqueInput!): Profile
  documentType(where: DocumentTypeWhereUniqueInput!): DocumentType
  document(where: DocumentWhereUniqueInput!): Document
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  profilesConnection(where: ProfileWhereInput, orderBy: ProfileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProfileConnection!
  documentTypesConnection(where: DocumentTypeWhereInput, orderBy: DocumentTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DocumentTypeConnection!
  documentsConnection(where: DocumentWhereInput, orderBy: DocumentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DocumentConnection!
  """
  Fetches an object given its ID
  """
  node("""
  The ID of an object
  """
  id: ID!): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  profile(where: ProfileSubscriptionWhereInput): ProfileSubscriptionPayload
  documentType(where: DocumentTypeSubscriptionWhereInput): DocumentTypeSubscriptionPayload
  document(where: DocumentSubscriptionWhereInput): DocumentSubscriptionPayload
}
`

export type UserOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'role_ASC' |
  'role_DESC' |
  'lastLogin_ASC' |
  'lastLogin_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type DocumentOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'publishDate_ASC' |
  'publishDate_DESC' |
  'title_ASC' |
  'title_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type ProfileOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'firstName_ASC' |
  'firstName_DESC' |
  'lastName_ASC' |
  'lastName_DESC' |
  'dateOfBirth_ASC' |
  'dateOfBirth_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type DocumentTypeOrderByInput = 
  'id_ASC' |
  'id_DESC' |
  'title_ASC' |
  'title_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type Role = 
  'ADMIN' |
  'EDITOR' |
  'USER' |
  'UNAUTHORIZED'

export type MutationType = 
  'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateWithoutProfileInput {
  email: String
  password: String
  role?: Role
  lastLogin?: DateTime
  documents?: DocumentCreateManyWithoutAuthorInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  role?: Role
  role_not?: Role
  role_in?: Role[] | Role
  role_not_in?: Role[] | Role
  lastLogin?: DateTime
  lastLogin_not?: DateTime
  lastLogin_in?: DateTime[] | DateTime
  lastLogin_not_in?: DateTime[] | DateTime
  lastLogin_lt?: DateTime
  lastLogin_lte?: DateTime
  lastLogin_gt?: DateTime
  lastLogin_gte?: DateTime
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  profile?: ProfileWhereInput
  documents_every?: DocumentWhereInput
  documents_some?: DocumentWhereInput
  documents_none?: DocumentWhereInput
}

export interface UserCreateOneWithoutDocumentsInput {
  create?: UserCreateWithoutDocumentsInput
  connect?: UserWhereUniqueInput
}

export interface DocumentTypeWhereInput {
  AND?: DocumentTypeWhereInput[] | DocumentTypeWhereInput
  OR?: DocumentTypeWhereInput[] | DocumentTypeWhereInput
  NOT?: DocumentTypeWhereInput[] | DocumentTypeWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  documents_every?: DocumentWhereInput
  documents_some?: DocumentWhereInput
  documents_none?: DocumentWhereInput
}

export interface DocumentUpsertWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput
  update: DocumentUpdateWithoutAuthorDataInput
  create: DocumentCreateWithoutAuthorInput
}

export interface DocumentTypeUpdateOneWithoutDocumentsInput {
  create?: DocumentTypeCreateWithoutDocumentsInput
  connect?: DocumentTypeWhereUniqueInput
  delete?: Boolean
  update?: DocumentTypeUpdateWithoutDocumentsDataInput
  upsert?: DocumentTypeUpsertWithoutDocumentsInput
}

export interface UserCreateInput {
  email: String
  password: String
  role?: Role
  lastLogin?: DateTime
  profile: ProfileCreateOneWithoutUserInput
  documents?: DocumentCreateManyWithoutAuthorInput
}

export interface UserCreateWithoutDocumentsInput {
  email: String
  password: String
  role?: Role
  lastLogin?: DateTime
  profile: ProfileCreateOneWithoutUserInput
}

export interface ProfileCreateOneWithoutUserInput {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
}

export interface DocumentWhereInput {
  AND?: DocumentWhereInput[] | DocumentWhereInput
  OR?: DocumentWhereInput[] | DocumentWhereInput
  NOT?: DocumentWhereInput[] | DocumentWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  publishDate?: DateTime
  publishDate_not?: DateTime
  publishDate_in?: DateTime[] | DateTime
  publishDate_not_in?: DateTime[] | DateTime
  publishDate_lt?: DateTime
  publishDate_lte?: DateTime
  publishDate_gt?: DateTime
  publishDate_gte?: DateTime
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  type?: DocumentTypeWhereInput
  author?: UserWhereInput
}

export interface ProfileCreateWithoutUserInput {
  firstName?: String
  lastName?: String
  dateOfBirth?: DateTime
}

export interface ProfileSubscriptionWhereInput {
  AND?: ProfileSubscriptionWhereInput[] | ProfileSubscriptionWhereInput
  OR?: ProfileSubscriptionWhereInput[] | ProfileSubscriptionWhereInput
  NOT?: ProfileSubscriptionWhereInput[] | ProfileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProfileWhereInput
}

export interface DocumentCreateManyWithoutAuthorInput {
  create?: DocumentCreateWithoutAuthorInput[] | DocumentCreateWithoutAuthorInput
  connect?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface DocumentCreateWithoutAuthorInput {
  publishDate: DateTime
  title: String
  type: DocumentTypeCreateOneWithoutDocumentsInput
}

export interface ProfileWhereUniqueInput {
  id?: ID_Input
}

export interface DocumentTypeCreateOneWithoutDocumentsInput {
  create?: DocumentTypeCreateWithoutDocumentsInput
  connect?: DocumentTypeWhereUniqueInput
}

export interface DocumentWhereUniqueInput {
  id?: ID_Input
}

export interface DocumentTypeCreateWithoutDocumentsInput {
  title: String
}

export interface DocumentUpsertWithWhereUniqueWithoutTypeInput {
  where: DocumentWhereUniqueInput
  update: DocumentUpdateWithoutTypeDataInput
  create: DocumentCreateWithoutTypeInput
}

export interface ProfileCreateInput {
  firstName?: String
  lastName?: String
  dateOfBirth?: DateTime
  user: UserCreateOneWithoutProfileInput
}

export interface UserUpdateWithoutDocumentsDataInput {
  email?: String
  password?: String
  role?: Role
  lastLogin?: DateTime
  profile?: ProfileUpdateOneWithoutUserInput
}

export interface UserCreateOneWithoutProfileInput {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
}

export interface DocumentUpdateWithoutTypeDataInput {
  publishDate?: DateTime
  title?: String
  author?: UserUpdateOneWithoutDocumentsInput
}

export interface DocumentTypeUpsertWithoutDocumentsInput {
  update: DocumentTypeUpdateWithoutDocumentsDataInput
  create: DocumentTypeCreateWithoutDocumentsInput
}

export interface DocumentUpdateManyWithoutTypeInput {
  create?: DocumentCreateWithoutTypeInput[] | DocumentCreateWithoutTypeInput
  connect?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
  disconnect?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
  delete?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
  update?: DocumentUpdateWithWhereUniqueWithoutTypeInput[] | DocumentUpdateWithWhereUniqueWithoutTypeInput
  upsert?: DocumentUpsertWithWhereUniqueWithoutTypeInput[] | DocumentUpsertWithWhereUniqueWithoutTypeInput
}

export interface DocumentTypeCreateInput {
  title: String
  documents?: DocumentCreateManyWithoutTypeInput
}

export interface UserUpsertWithoutProfileInput {
  update: UserUpdateWithoutProfileDataInput
  create: UserCreateWithoutProfileInput
}

export interface DocumentCreateManyWithoutTypeInput {
  create?: DocumentCreateWithoutTypeInput[] | DocumentCreateWithoutTypeInput
  connect?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
}

export interface UserUpdateOneWithoutProfileInput {
  create?: UserCreateWithoutProfileInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutProfileDataInput
  upsert?: UserUpsertWithoutProfileInput
}

export interface DocumentCreateWithoutTypeInput {
  publishDate: DateTime
  title: String
  author?: UserCreateOneWithoutDocumentsInput
}

export interface DocumentSubscriptionWhereInput {
  AND?: DocumentSubscriptionWhereInput[] | DocumentSubscriptionWhereInput
  OR?: DocumentSubscriptionWhereInput[] | DocumentSubscriptionWhereInput
  NOT?: DocumentSubscriptionWhereInput[] | DocumentSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: DocumentWhereInput
}

export interface DocumentTypeUpdateWithoutDocumentsDataInput {
  title?: String
}

export interface ProfileWhereInput {
  AND?: ProfileWhereInput[] | ProfileWhereInput
  OR?: ProfileWhereInput[] | ProfileWhereInput
  NOT?: ProfileWhereInput[] | ProfileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  firstName?: String
  firstName_not?: String
  firstName_in?: String[] | String
  firstName_not_in?: String[] | String
  firstName_lt?: String
  firstName_lte?: String
  firstName_gt?: String
  firstName_gte?: String
  firstName_contains?: String
  firstName_not_contains?: String
  firstName_starts_with?: String
  firstName_not_starts_with?: String
  firstName_ends_with?: String
  firstName_not_ends_with?: String
  lastName?: String
  lastName_not?: String
  lastName_in?: String[] | String
  lastName_not_in?: String[] | String
  lastName_lt?: String
  lastName_lte?: String
  lastName_gt?: String
  lastName_gte?: String
  lastName_contains?: String
  lastName_not_contains?: String
  lastName_starts_with?: String
  lastName_not_starts_with?: String
  lastName_ends_with?: String
  lastName_not_ends_with?: String
  dateOfBirth?: DateTime
  dateOfBirth_not?: DateTime
  dateOfBirth_in?: DateTime[] | DateTime
  dateOfBirth_not_in?: DateTime[] | DateTime
  dateOfBirth_lt?: DateTime
  dateOfBirth_lte?: DateTime
  dateOfBirth_gt?: DateTime
  dateOfBirth_gte?: DateTime
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  user?: UserWhereInput
}

export interface DocumentTypeWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpsertWithoutDocumentsInput {
  update: UserUpdateWithoutDocumentsDataInput
  create: UserCreateWithoutDocumentsInput
}

export interface DocumentCreateInput {
  publishDate: DateTime
  title: String
  type: DocumentTypeCreateOneWithoutDocumentsInput
  author?: UserCreateOneWithoutDocumentsInput
}

export interface DocumentUpdateWithWhereUniqueWithoutTypeInput {
  where: DocumentWhereUniqueInput
  data: DocumentUpdateWithoutTypeDataInput
}

export interface UserUpdateInput {
  email?: String
  password?: String
  role?: Role
  lastLogin?: DateTime
  profile?: ProfileUpdateOneWithoutUserInput
  documents?: DocumentUpdateManyWithoutAuthorInput
}

export interface UserUpdateWithoutProfileDataInput {
  email?: String
  password?: String
  role?: Role
  lastLogin?: DateTime
  documents?: DocumentUpdateManyWithoutAuthorInput
}

export interface ProfileUpdateOneWithoutUserInput {
  create?: ProfileCreateWithoutUserInput
  connect?: ProfileWhereUniqueInput
  delete?: Boolean
  update?: ProfileUpdateWithoutUserDataInput
  upsert?: ProfileUpsertWithoutUserInput
}

export interface DocumentTypeSubscriptionWhereInput {
  AND?: DocumentTypeSubscriptionWhereInput[] | DocumentTypeSubscriptionWhereInput
  OR?: DocumentTypeSubscriptionWhereInput[] | DocumentTypeSubscriptionWhereInput
  NOT?: DocumentTypeSubscriptionWhereInput[] | DocumentTypeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: DocumentTypeWhereInput
}

export interface ProfileUpdateWithoutUserDataInput {
  firstName?: String
  lastName?: String
  dateOfBirth?: DateTime
}

export interface DocumentUpdateInput {
  publishDate?: DateTime
  title?: String
  type?: DocumentTypeUpdateOneWithoutDocumentsInput
  author?: UserUpdateOneWithoutDocumentsInput
}

export interface DocumentUpdateWithoutAuthorDataInput {
  publishDate?: DateTime
  title?: String
  type?: DocumentTypeUpdateOneWithoutDocumentsInput
}

export interface DocumentUpdateWithWhereUniqueWithoutAuthorInput {
  where: DocumentWhereUniqueInput
  data: DocumentUpdateWithoutAuthorDataInput
}

export interface DocumentUpdateManyWithoutAuthorInput {
  create?: DocumentCreateWithoutAuthorInput[] | DocumentCreateWithoutAuthorInput
  connect?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
  disconnect?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
  delete?: DocumentWhereUniqueInput[] | DocumentWhereUniqueInput
  update?: DocumentUpdateWithWhereUniqueWithoutAuthorInput[] | DocumentUpdateWithWhereUniqueWithoutAuthorInput
  upsert?: DocumentUpsertWithWhereUniqueWithoutAuthorInput[] | DocumentUpsertWithWhereUniqueWithoutAuthorInput
}

export interface ProfileUpsertWithoutUserInput {
  update: ProfileUpdateWithoutUserDataInput
  create: ProfileCreateWithoutUserInput
}

export interface UserUpdateOneWithoutDocumentsInput {
  create?: UserCreateWithoutDocumentsInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateWithoutDocumentsDataInput
  upsert?: UserUpsertWithoutDocumentsInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

export interface ProfileUpdateInput {
  firstName?: String
  lastName?: String
  dateOfBirth?: DateTime
  user?: UserUpdateOneWithoutProfileInput
}

export interface DocumentTypeUpdateInput {
  title?: String
  documents?: DocumentUpdateManyWithoutTypeInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface DocumentPreviousValues {
  id: ID_Output
  publishDate: DateTime
  title: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface User extends Node {
  id: ID_Output
  email: String
  password: String
  role: Role
  profile: Profile
  documents?: Document[]
  lastLogin?: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}

export interface BatchPayload {
  count: Long
}

export interface AggregateDocument {
  count: Int
}

export interface Profile extends Node {
  id: ID_Output
  firstName?: String
  lastName?: String
  dateOfBirth?: DateTime
  user: User
  createdAt: DateTime
  updatedAt: DateTime
}

export interface Document extends Node {
  id: ID_Output
  publishDate: DateTime
  title: String
  type: DocumentType
  author?: User
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface DocumentEdge {
  node: Document
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface DocumentConnection {
  pageInfo: PageInfo
  edges: DocumentEdge[]
  aggregate: AggregateDocument
}

export interface AggregateDocumentType {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface DocumentTypeConnection {
  pageInfo: PageInfo
  edges: DocumentTypeEdge[]
  aggregate: AggregateDocumentType
}

export interface DocumentTypePreviousValues {
  id: ID_Output
  title: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface ProfileEdge {
  node: Profile
  cursor: String
}

export interface DocumentTypeSubscriptionPayload {
  mutation: MutationType
  node?: DocumentType
  updatedFields?: String[]
  previousValues?: DocumentTypePreviousValues
}

export interface AggregateUser {
  count: Int
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface DocumentSubscriptionPayload {
  mutation: MutationType
  node?: Document
  updatedFields?: String[]
  previousValues?: DocumentPreviousValues
}

/*
 * An edge in a connection.

 */
export interface DocumentTypeEdge {
  node: DocumentType
  cursor: String
}

export interface ProfilePreviousValues {
  id: ID_Output
  firstName?: String
  lastName?: String
  dateOfBirth?: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}

export interface ProfileSubscriptionPayload {
  mutation: MutationType
  node?: Profile
  updatedFields?: String[]
  previousValues?: ProfilePreviousValues
}

export interface DocumentType extends Node {
  id: ID_Output
  title: String
  documents?: Document[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password: String
  role: Role
  lastLogin?: DateTime
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateProfile {
  count: Int
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface ProfileConnection {
  pageInfo: PageInfo
  edges: ProfileEdge[]
  aggregate: AggregateProfile
}

/*
The 'Long' scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

export type DateTime = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export interface Schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

export type Query = {
  users: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<User[]>
  profiles: (args: { where?: ProfileWhereInput, orderBy?: ProfileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Profile[]>
  documentTypes: (args: { where?: DocumentTypeWhereInput, orderBy?: DocumentTypeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<DocumentType[]>
  documents: (args: { where?: DocumentWhereInput, orderBy?: DocumentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<Document[]>
  user: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  profile: (args: { where: ProfileWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Profile | null>
  documentType: (args: { where: DocumentTypeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<DocumentType | null>
  document: (args: { where: DocumentWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Document | null>
  usersConnection: (args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<UserConnection>
  profilesConnection: (args: { where?: ProfileWhereInput, orderBy?: ProfileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<ProfileConnection>
  documentTypesConnection: (args: { where?: DocumentTypeWhereInput, orderBy?: DocumentTypeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<DocumentTypeConnection>
  documentsConnection: (args: { where?: DocumentWhereInput, orderBy?: DocumentOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string) => Promise<DocumentConnection>
  node: (args: { id: ID_Output }, info?: GraphQLResolveInfo | string) => Promise<Node | null>
}

export type Mutation = {
  createUser: (args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  createProfile: (args: { data: ProfileCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Profile>
  createDocumentType: (args: { data: DocumentTypeCreateInput }, info?: GraphQLResolveInfo | string) => Promise<DocumentType>
  createDocument: (args: { data: DocumentCreateInput }, info?: GraphQLResolveInfo | string) => Promise<Document>
  updateUser: (args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  updateProfile: (args: { data: ProfileUpdateInput, where: ProfileWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Profile | null>
  updateDocumentType: (args: { data: DocumentTypeUpdateInput, where: DocumentTypeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<DocumentType | null>
  updateDocument: (args: { data: DocumentUpdateInput, where: DocumentWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Document | null>
  deleteUser: (args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<User | null>
  deleteProfile: (args: { where: ProfileWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Profile | null>
  deleteDocumentType: (args: { where: DocumentTypeWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<DocumentType | null>
  deleteDocument: (args: { where: DocumentWhereUniqueInput }, info?: GraphQLResolveInfo | string) => Promise<Document | null>
  upsertUser: (args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<User>
  upsertProfile: (args: { where: ProfileWhereUniqueInput, create: ProfileCreateInput, update: ProfileUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Profile>
  upsertDocumentType: (args: { where: DocumentTypeWhereUniqueInput, create: DocumentTypeCreateInput, update: DocumentTypeUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<DocumentType>
  upsertDocument: (args: { where: DocumentWhereUniqueInput, create: DocumentCreateInput, update: DocumentUpdateInput }, info?: GraphQLResolveInfo | string) => Promise<Document>
  updateManyUsers: (args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyProfiles: (args: { data: ProfileUpdateInput, where?: ProfileWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyDocumentTypes: (args: { data: DocumentTypeUpdateInput, where?: DocumentTypeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  updateManyDocuments: (args: { data: DocumentUpdateInput, where?: DocumentWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyUsers: (args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyProfiles: (args: { where?: ProfileWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyDocumentTypes: (args: { where?: DocumentTypeWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
  deleteManyDocuments: (args: { where?: DocumentWhereInput }, info?: GraphQLResolveInfo | string) => Promise<BatchPayload>
}

export type Subscription = {
  user: (args: { where?: UserSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<UserSubscriptionPayload>>
  profile: (args: { where?: ProfileSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<ProfileSubscriptionPayload>>
  documentType: (args: { where?: DocumentTypeSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<DocumentTypeSubscriptionPayload>>
  document: (args: { where?: DocumentSubscriptionWhereInput }, infoOrQuery?: GraphQLResolveInfo | string) => Promise<AsyncIterator<DocumentSubscriptionPayload>>
}

export class Prisma extends BasePrisma {
  
  constructor({ endpoint, secret, fragmentReplacements, debug }: BasePrismaOptions) {
    super({ typeDefs, endpoint, secret, fragmentReplacements, debug });
  }

  exists = {
    User: (where: UserWhereInput): Promise<boolean> => super.existsDelegate('query', 'users', { where }, {}, '{ id }'),
    Profile: (where: ProfileWhereInput): Promise<boolean> => super.existsDelegate('query', 'profiles', { where }, {}, '{ id }'),
    DocumentType: (where: DocumentTypeWhereInput): Promise<boolean> => super.existsDelegate('query', 'documentTypes', { where }, {}, '{ id }'),
    Document: (where: DocumentWhereInput): Promise<boolean> => super.existsDelegate('query', 'documents', { where }, {}, '{ id }')
  }

  query: Query = {
    users: (args, info): Promise<User[]> => super.delegate('query', 'users', args, {}, info),
    profiles: (args, info): Promise<Profile[]> => super.delegate('query', 'profiles', args, {}, info),
    documentTypes: (args, info): Promise<DocumentType[]> => super.delegate('query', 'documentTypes', args, {}, info),
    documents: (args, info): Promise<Document[]> => super.delegate('query', 'documents', args, {}, info),
    user: (args, info): Promise<User | null> => super.delegate('query', 'user', args, {}, info),
    profile: (args, info): Promise<Profile | null> => super.delegate('query', 'profile', args, {}, info),
    documentType: (args, info): Promise<DocumentType | null> => super.delegate('query', 'documentType', args, {}, info),
    document: (args, info): Promise<Document | null> => super.delegate('query', 'document', args, {}, info),
    usersConnection: (args, info): Promise<UserConnection> => super.delegate('query', 'usersConnection', args, {}, info),
    profilesConnection: (args, info): Promise<ProfileConnection> => super.delegate('query', 'profilesConnection', args, {}, info),
    documentTypesConnection: (args, info): Promise<DocumentTypeConnection> => super.delegate('query', 'documentTypesConnection', args, {}, info),
    documentsConnection: (args, info): Promise<DocumentConnection> => super.delegate('query', 'documentsConnection', args, {}, info),
    node: (args, info): Promise<Node | null> => super.delegate('query', 'node', args, {}, info)
  }

  mutation: Mutation = {
    createUser: (args, info): Promise<User> => super.delegate('mutation', 'createUser', args, {}, info),
    createProfile: (args, info): Promise<Profile> => super.delegate('mutation', 'createProfile', args, {}, info),
    createDocumentType: (args, info): Promise<DocumentType> => super.delegate('mutation', 'createDocumentType', args, {}, info),
    createDocument: (args, info): Promise<Document> => super.delegate('mutation', 'createDocument', args, {}, info),
    updateUser: (args, info): Promise<User | null> => super.delegate('mutation', 'updateUser', args, {}, info),
    updateProfile: (args, info): Promise<Profile | null> => super.delegate('mutation', 'updateProfile', args, {}, info),
    updateDocumentType: (args, info): Promise<DocumentType | null> => super.delegate('mutation', 'updateDocumentType', args, {}, info),
    updateDocument: (args, info): Promise<Document | null> => super.delegate('mutation', 'updateDocument', args, {}, info),
    deleteUser: (args, info): Promise<User | null> => super.delegate('mutation', 'deleteUser', args, {}, info),
    deleteProfile: (args, info): Promise<Profile | null> => super.delegate('mutation', 'deleteProfile', args, {}, info),
    deleteDocumentType: (args, info): Promise<DocumentType | null> => super.delegate('mutation', 'deleteDocumentType', args, {}, info),
    deleteDocument: (args, info): Promise<Document | null> => super.delegate('mutation', 'deleteDocument', args, {}, info),
    upsertUser: (args, info): Promise<User> => super.delegate('mutation', 'upsertUser', args, {}, info),
    upsertProfile: (args, info): Promise<Profile> => super.delegate('mutation', 'upsertProfile', args, {}, info),
    upsertDocumentType: (args, info): Promise<DocumentType> => super.delegate('mutation', 'upsertDocumentType', args, {}, info),
    upsertDocument: (args, info): Promise<Document> => super.delegate('mutation', 'upsertDocument', args, {}, info),
    updateManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyUsers', args, {}, info),
    updateManyProfiles: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyProfiles', args, {}, info),
    updateManyDocumentTypes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyDocumentTypes', args, {}, info),
    updateManyDocuments: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'updateManyDocuments', args, {}, info),
    deleteManyUsers: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyUsers', args, {}, info),
    deleteManyProfiles: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyProfiles', args, {}, info),
    deleteManyDocumentTypes: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyDocumentTypes', args, {}, info),
    deleteManyDocuments: (args, info): Promise<BatchPayload> => super.delegate('mutation', 'deleteManyDocuments', args, {}, info)
  }

  subscription: Subscription = {
    user: (args, infoOrQuery): Promise<AsyncIterator<UserSubscriptionPayload>> => super.delegateSubscription('user', args, {}, infoOrQuery),
    profile: (args, infoOrQuery): Promise<AsyncIterator<ProfileSubscriptionPayload>> => super.delegateSubscription('profile', args, {}, infoOrQuery),
    documentType: (args, infoOrQuery): Promise<AsyncIterator<DocumentTypeSubscriptionPayload>> => super.delegateSubscription('documentType', args, {}, infoOrQuery),
    document: (args, infoOrQuery): Promise<AsyncIterator<DocumentSubscriptionPayload>> => super.delegateSubscription('document', args, {}, infoOrQuery)
  }
}