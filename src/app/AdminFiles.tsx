import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { Mutation, MutationFn, Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import { DeleteFile, DeleteFileVariables } from './__generated__/DeleteFile';
import { Files } from './__generated__/Files';
import Button from './components/Button';
import Heading from './components/Heading';
import Loader from './components/Loader';
import PageLayout from './components/PageLayout';
import { Table, TableRow } from './components/Table';

function AdminFiles() {
  return (
    <AdminFilesLayout>
      <Heading>Files</Heading>
      <Query<Files> query={FILES_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (!data || loading) {
            return <Loader />;
          }

          return (
            <Table>
              {data.files.map(file => {
                const isImage = file.mimetype.split('/')[0] === 'image';
                return (
                  <FileRow key={`FILE_${file.id}`}>
                    {isImage && <img style={{ width: 128 }} src={file.url} />}
                    <span>{file.id}</span>
                    <span>{file.mimetype}</span>
                    <Mutation<DeleteFile, DeleteFileVariables>
                      mutation={DELETE_FILE_MUTATION}
                    >
                      {mutate => (
                        <Button onClick={() => deleteFile(mutate, file.id)}>
                          X
                        </Button>
                      )}
                    </Mutation>
                  </FileRow>
                );
              })}
            </Table>
          );
        }}
      </Query>
    </AdminFilesLayout>
  );
}

export default hot(module)(AdminFiles);

const FILES_QUERY = gql`
  query Files {
    files {
      id
      mimetype
      key
      bucket
      url
    }
  }
`;

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFile($where: FileWhereUniqueInput!) {
    deleteFile(where: $where) {
      id
    }
  }
`;

function deleteFile(
  mutate: MutationFn<DeleteFile, DeleteFileVariables>,
  id: string,
) {
  return mutate({
    update: (cache, { data }) => {
      const filesCache = cache.readQuery<Files>({ query: FILES_QUERY });

      if (!(filesCache && filesCache.files)) {
        return;
      }

      cache.writeQuery({
        data: {
          files: filesCache.files.filter(file => {
            if (!(data && data.deleteFile)) {
              return true;
            }
            return file.id !== data.deleteFile.id;
          }),
        },
        query: FILES_QUERY,
      });
    },
    variables: { where: { id } },
  });
}

const AdminFilesLayout = styled(PageLayout)``;

const FileRow = styled(TableRow)`
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-columns: ${rem(128)} 2fr 1fr ${rem(64)};
  align-items: center;
`;
