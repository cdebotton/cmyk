import gql from 'graphql-tag';
import React from 'react';
import * as yup from 'yup';
import { CreateDocument, CreateDocumentVariables } from './__generated__/CreateDocument';
import { DocumentTypes } from './__generated__/DocumentTypes';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
import { useField, useForm } from './hooks/useForm';

const CREATE_DOCUMENT = gql`
  mutation CreateDocument($data: DocumentCreateInput!) {
    createDocument(data: $data) {
      id
    }
  }
`;

const DOCUMENT_TYPES = gql`
  query DocumentTypes {
    documentTypes {
      id
      title
    }
  }
`;

const validationSchema = new yup.object().shape({
  title: yup.string().required(),
});

function AdminNewDocument() {
  const {
    data: { documentTypes },
  } = useApolloQuery<DocumentTypes>(DOCUMENT_TYPES);
  const createDocument = useApolloMutation<CreateDocument, CreateDocumentVariables>(
    CREATE_DOCUMENT,
  );

  const form = useForm({
    validationSchema,
    initialValues: {
      title: '',
    },
    onSubmit: async values => {
      await createDocument({
        variables: {
          data: {
            publishDate: Date.now(),
            title: values.title,
          },
        },
      });
    },
  });

  const title = useField('title', form);

  return (
    <EditorLayout>
      <Heading>New document</Heading>
      <Form onSubmit={form.handleSubmit}>
        <Input name="title" label="Title" {...title.input} {...title.meta} />
        <Button type="submit">Create document</Button>
      </Form>
    </EditorLayout>
  );
}

export default AdminNewDocument;
