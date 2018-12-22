import gql from 'graphql-tag';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { TDocuments } from './types';
import List, { Item } from './components/List';
import ListLayout, { CreateLink, Heading } from './components/ListLayout';
import { useQuery } from './hooks/useApollo';
import useTitle from './hooks/useTitle';

const DOCUMENTS_QUERY = gql`
  query TDocuments {
    documents {
      id
      title
    }
  }
`;

interface Props extends RouteComponentProps<{}> {}

function AdminDocuments({ match: { url } }: Props) {
  useTitle('Documents | Admin');

  const {
    data: { documents },
  } = useQuery<TDocuments>(DOCUMENTS_QUERY);

  return (
    <ListLayout>
      <Heading>Documents</Heading>
      <CreateLink to={`${url}/new`}>New document</CreateLink>
      <List hidden={documents.length === 0}>
        {documents.map(({ id, __typename }) => {
          return <Item to={`${url}/${id}`} key={`${__typename}:${id}`} label={document.title} />;
        })}
      </List>
    </ListLayout>
  );
}

export default AdminDocuments;
