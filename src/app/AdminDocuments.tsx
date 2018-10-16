import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import { Documents } from './__generated__/Documents';
import Heading from './components/Heading';
import Loader from './components/Loader';
import PageLayout from './components/PageLayout';
import { Table, TableRow } from './components/Table';

const DOCUMENTS_QUERY = gql`
  query Documents {
    documents {
      id
      title
    }
  }
`;

const DocumentsHeading = styled(Heading)`
  ${padding(rem(32))};
`;

function AdminDocuments() {
  return (
    <PageLayout>
      <DocumentsHeading>Documents</DocumentsHeading>
      <Query<Documents> query={DOCUMENTS_QUERY}>
        {({ data, error, loading }) => {
          if (error) {
            return null;
          }

          if (loading || !data) {
            return <Loader />;
          }

          return (
            <Table controls={<div>HI</div>}>
              {data.documents.map(document => (
                <TableRow key={`DOCUMENT_${document.id}`}>
                  <code>{JSON.stringify(document, null, 2)}</code>
                </TableRow>
              ))}
            </Table>
          );
        }}
      </Query>
    </PageLayout>
  );
}

export default hot(module)(AdminDocuments);
