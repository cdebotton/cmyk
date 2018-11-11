import gql from 'graphql-tag';
import { rem } from 'polished';
import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import { DeleteFile, DeleteFileVariables } from './__generated__/DeleteFile';
import { Files } from './__generated__/Files';
import Confirm from './components/Confirm';
import Layout from './components/Layout';
import List, { Item } from './components/List';
import PageHeading from './components/PageHeading';
import PortalContext from './containers/PortalContext';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
import { getTimeAgo } from './utils/date';

const FILES_QUERY = gql`
  query Files {
    files {
      id
      mimetype
      key
      bucket
      url
      createdAt
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

interface Props extends RouteComponentProps<{}> {}

function AdminFiles({ match }: Props) {
  const {
    data: { files },
  } = useApolloQuery<Files>(FILES_QUERY);

  const { setPortalNode } = useContext(PortalContext);

  const mutate = useApolloMutation<DeleteFile, DeleteFileVariables>(DELETE_FILE_MUTATION);

  function deleteFile(id: string) {
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

  const gutter = `minmax(${rem(16)}, auto)`;

  const AdminFilesLayout = styled(Layout)`
    grid-gap: ${rem(16)};
    grid-template-columns: ${gutter} minmax(auto, ${rem(1680)}) ${gutter};
    align-content: start;
  `;

  const FilesHeading = styled(PageHeading)`
    grid-column: 2 / span 1;
  `;

  return (
    <AdminFilesLayout>
      <FilesHeading>Files</FilesHeading>
      <List>
        {files.map(file => {
          return (
            <Item
              key={file.id}
              image={file.url}
              label={file.key}
              info={file.mimetype}
              to={`${match.url}/${file.id}`}
              details={[{ label: 'Created', info: getTimeAgo(file.createdAt) }]}
              onDelete={() => {
                setPortalNode(
                  <Confirm
                    title="Are you sure?"
                    message={
                      <>
                        This will delete file{' '}
                        <em>
                          {file.bucket}/{file.key}
                        </em>{' '}
                        from the database as well as from storage
                      </>
                    }
                    onConfirm={() => {
                      deleteFile(file.id);
                      setPortalNode(null);
                    }}
                    onCancel={() => setPortalNode(null)}
                  />,
                );
              }}
            />
          );
        })}
      </List>
    </AdminFilesLayout>
  );
}

export default AdminFiles;
