import { DocumentTypeResolvers } from '../__generated__/graphqlgen';

const DocumentType: DocumentTypeResolvers.Type = {
  ...DocumentTypeResolvers.defaultResolvers,
  documents: (parent, _args, ctx) => ctx.db.documentType({ id: parent.id }).documents(),
};

export default DocumentType;
