declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  var document: DocumentNode;
  export = document;
}
