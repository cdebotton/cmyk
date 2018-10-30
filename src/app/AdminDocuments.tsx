import gql from 'graphql-tag';
import { padding, rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { Documents } from './__generated__/Documents';
import Heading from './components/Heading';
import PageLayout from './components/PageLayout';
import { Table, TableRow } from './components/Table';
import { useApolloQuery } from './hooks/Apollo';

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
  const {
    data: { documents },
  } = useApolloQuery<Documents>(DOCUMENTS_QUERY);

  return (
    <PageLayout>
      <DocumentsHeading>Documents</DocumentsHeading>
      <Table controls={<div>HI</div>}>
        {documents.map(document => (
          <TableRow key={`DOCUMENT_${document.id}`}>
            <code>{JSON.stringify(document, null, 2)}</code>
          </TableRow>
        ))}
      </Table>
    </PageLayout>
  );
}

export default AdminDocuments;
