import gql from 'graphql-tag';
import { rem } from 'polished';
import React from 'react';
import { MutationFn } from 'react-apollo';
import styled from 'styled-components';
import { DeleteFile, DeleteFileVariables } from './__generated__/DeleteFile';
import { Files } from './__generated__/Files';
import Button from './components/Button';
import Heading from './components/Heading';
import PageLayout from './components/PageLayout';
import { Table, TableRow } from './components/Table';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';

function AdminFiles() {
  const {
    data: { files },
  } = useApolloQuery<Files>(FILES_QUERY);

  const deleteFileMutation = useApolloMutation<DeleteFile, DeleteFileVariables>(
    DELETE_FILE_MUTATION,
  );

  return (
    <AdminFilesLayout>
      <Heading>Files</Heading>
      <Table>
        {files.map(file => {
          const isImage = file.mimetype.split('/')[0] === 'image';
          return (
            <FileRow key={`FILE_${file.id}`}>
              {isImage && <img style={{ width: 128 }} src={file.url} />}
              <span>{file.id}</span>
              <span>{file.mimetype}</span>
              <Button onClick={() => deleteFile(deleteFileMutation, file.id)}>
                X
              </Button>
            </FileRow>
          );
        })}
      </Table>
    </AdminFilesLayout>
  );
}

export default AdminFiles;

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
