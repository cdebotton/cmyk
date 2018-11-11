import { DocumentTypeResolvers } from '../generated/graphqlgen';

const DocumentType: DocumentTypeResolvers.Type = {
  ...DocumentTypeResolvers.defaultResolvers,
  documents: (parent, _args, ctx) => ctx.db.documentType({ id: parent.id }).documents(),
};

export default DocumentType;
