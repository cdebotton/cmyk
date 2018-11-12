import gql from 'graphql-tag';
import React from 'react';
import * as yup from 'yup';
import { TCreateDocument, TCreateDocumentVariables } from './generated/TCreateDocument';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import { useApolloMutation, useApolloQuery } from './hooks/Apollo';
import { useField, useForm } from './hooks/useForm';

const CREATE_DOCUMENT = gql`
  mutation TCreateDocument($input: DocumentCreateInput!) {
    createDocument(input: $input) {
      id
    }
  }
`;

const validationSchema = new yup.object().shape({
  title: yup.string().required(),
});

function AdminNewDocument() {
  const createDocument = useApolloMutation<TCreateDocument, TCreateDocumentVariables>(
    CREATE_DOCUMENT,
  );

  const form = useForm({
    validationSchema,
    initialValues: {
      title: '',
    },
    onSubmit: async values => {
      // await createDocument({
      //   variables: {
      //     data: {
      //       publishDate: Date.now(),
      //       title: values.title,
      //     },
      //   },
      // });
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
