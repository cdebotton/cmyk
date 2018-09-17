import { DocumentTypeResolvers } from '../__generated__/resolvers';
import { TypeMap } from './TypeMap';

const DocumentType: DocumentTypeResolvers.Type<TypeMap> = {
  createdAt: parent => parent.createdAt,
  documents: parent => parent.documents,
  id: parent => parent.id,
  title: parent => parent.title,
  updatedAt: parent => parent.updatedAt,
};

export default DocumentType;
