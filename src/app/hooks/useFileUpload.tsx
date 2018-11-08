import { ApolloError } from 'apollo-client';
import gql from 'graphql-tag';
import { useState } from 'react';
import {
  UploadFileMutation,
  UploadFileMutation_uploadFile,
  UploadFileMutationVariables,
} from './__generated__/UploadFileMutation';
import { useApolloMutation } from './Apollo';

const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFileMutation($file: Upload!) {
    uploadFile(file: $file) {
      __typename
      id
      bucket
      key
      url
    }
  }
`;

type Uploader = (file: File) => Promise<void>;
interface Context {
  data: UploadFileMutation_uploadFile | null;
  error: ApolloError | null;
  uploading: boolean;
}

function useFileUpload(): [Uploader, Context] {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<ApolloError | null>(null);
  const [data, setData] = useState<UploadFileMutation_uploadFile | null>(null);

  const uploadFileMutation = useApolloMutation<
    UploadFileMutation,
    UploadFileMutationVariables
  >(UPLOAD_FILE_MUTATION);

  async function upload(file: File) {
    setUploading(true);

    try {
      const result = await uploadFileMutation({
        variables: {
          file,
        },
      });

      if (result && result.data) {
        setData(result.data.uploadFile);
      }
    } catch (err) {
      setError(err);
    }

    setUploading(false);
  }

  return [upload, { data, error, uploading }];
}

export default useFileUpload;
