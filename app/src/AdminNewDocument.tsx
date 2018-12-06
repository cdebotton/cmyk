import gql from 'graphql-tag';
import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
// import { TCreateDocument, TCreateDocumentVariables } from './types';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import { useApolloMutation } from './hooks/Apollo';
import { useField, useForm, useFieldArray } from './hooks/useForm';
import Select from './components/Select';
import styled from 'styled-components';
import { rem, padding } from 'polished';

const DocumentForm = styled(Form)`
  grid-template-columns: [form-start] 1fr 1fr max-content max-content [form-end];
`;

const FieldSet = styled.div`
  grid-column: form-start / form-end;
  grid-row: 2;
`;

const CREATE_DOCUMENT = gql`
  mutation TCreateDocument($input: DocumentCreateInput!) {
    createDocument(input: $input) {
      id
    }
  }
`;

const fieldSchema = yup.lazy((field: any) => {
  switch (field.type) {
    case 'plain_text':
      return yup.object().shape({
        handle: yup.string().required(),
        required: yup.boolean().required(),
      });
    case 'asset':
      return yup.object().shape({});
    default:
      throw new Error('Unhandled field validation type');
  }
});

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  fields: yup
    .array()
    .of(fieldSchema)
    .min(1),
});

type FieldType = 'plain_text' | 'asset';

interface Form {
  title: string;
  fields: any[];
}

function createField(fieldType: FieldType) {
  return {
    type: fieldType,
    handle: '',
    required: false,
    value: '',
  };
}

function PlainTextFieldInput(props: any) {
  return (
    <>
      <input {...props.input} />
      <input type="checkbox" />
      <input />
    </>
  );
}

function AdminNewDocument() {
  // const createDocument = useApolloMutation<TCreateDocument, TCreateDocumentVariables>(
  //   CREATE_DOCUMENT,
  // );

  const [nextFieldType, setNextFieldType] = useState<FieldType>('plain_text');

  const form = useForm<Form>({
    validationSchema,
    initialValues: {
      title: '',
      fields: [],
    },
    onSubmit: async values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const title = useField('title', form);
  const [fields, { push }] = useFieldArray('fields', form);

  console.log(fields);

  const addField = useCallback(
    () => {
      push(createField(nextFieldType));
    },
    [push, nextFieldType],
  );

  return (
    <EditorLayout>
      <Heading>New document</Heading>
      <DocumentForm onSubmit={form.handleSubmit}>
        <Input name="title" label="Title" {...title.input} {...title.meta} />
        <Select
          name="fieldType"
          label="Add field"
          options={[
            { label: 'Plain text', value: 'plain_text' },
            { label: 'Asset', value: 'asset' },
          ]}
          value={nextFieldType}
          setValue={setNextFieldType}
        />
        <Button type="button" onClick={addField}>
          Add field
        </Button>
        <Button type="submit" disabled={!form.valid}>
          Create document
        </Button>
        <FieldSet>
          {fields.map((field: any) => {
            switch (field.type) {
              case 'plain_text':
                return <PlainTextFieldInput {...field} />;
              case 'asset':
                return <pre>{JSON.stringify(field, null, 2)}</pre>;
              default:
                return null;
            }
          })}
        </FieldSet>
      </DocumentForm>
    </EditorLayout>
  );
}

export default AdminNewDocument;
