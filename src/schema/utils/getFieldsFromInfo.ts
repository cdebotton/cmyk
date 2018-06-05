import {
  GraphQLResolveInfo,
  FragmentSpreadNode,
  InlineFragmentNode,
  SelectionNode,
  FragmentDefinitionNode,
} from 'graphql';

const INLINE_FRAGMENT = 'InlineFragment';
const FRAGMENT_SPREAD = 'FragmentSpread';

type FragmentNode = FragmentSpreadNode | InlineFragmentNode;

const getSelections = (
  ast: SelectionNode | FragmentDefinitionNode,
): SelectionNode[] => {
  if (ast.kind === FRAGMENT_SPREAD) {
    return [];
  }

  if (
    ast &&
    ast.selectionSet &&
    ast.selectionSet.selections &&
    ast.selectionSet.selections.length
  ) {
    return ast.selectionSet.selections;
  }

  return [];
};

const isFragment = (ast: SelectionNode): ast is FragmentNode =>
  ast.kind === INLINE_FRAGMENT || ast.kind === FRAGMENT_SPREAD;

const getAST = (
  ast: SelectionNode,
  info: GraphQLResolveInfo,
): SelectionNode | FragmentDefinitionNode => {
  if (ast.kind === FRAGMENT_SPREAD) {
    const fragmentName = ast.name.value;
    return info.fragments[fragmentName];
  }
  return ast;
};

const flattenAST = (
  ast: SelectionNode | FragmentDefinitionNode,
  info: GraphQLResolveInfo,
  obj: { [x: string]: any },
): object =>
  getSelections(ast).reduce((flattened, a) => {
    if (isFragment(a)) {
      return flattenAST(getAST(a, info), info, flattened);
    } else {
      const name = a.name.value;
      if (flattened[name]) {
        return {
          ...flattened,
          [name]: {
            ...flattened[name],
            ...flattenAST(a, info, flattened[name]),
          },
        };
      } else {
        return {
          ...flattened,
          [name]: flattenAST(a, info, {}),
        };
      }
    }
  }, obj);

const getFieldsFromInfo = <E>(
  info: GraphQLResolveInfo,
  obj?: { [x: string]: any },
): { [x: string]: any } =>
  info.fieldNodes.reduce((acc, ast) => flattenAST(ast, info, acc), obj || {});

export default getFieldsFromInfo;
