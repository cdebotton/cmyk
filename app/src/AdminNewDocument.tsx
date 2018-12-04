import gql from 'graphql-tag';
import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
// import { TCreateDocument, TCreateDocumentVariables } from './types';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import { useApolloMutation } from './hooks/Apollo';
import { useField, useForm, useArrayField } from './hooks/useForm';
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

const validationSchema = new yup.object().shape({
  title: yup.string().required(),
  fields: yup.array().min(1),
});

type FieldType = 'plain_text' | 'asset';

interface PlainTextField {
  type: 'plain_text';
  order: number;
  required: boolean;
  handle: string;
  value: string;
}

type Field = PlainTextField | { type: 'asset'; order: number; handle: string; required: boolean };

interface Form {
  title: string;
  fields: Array<Field>;
}

function PlainTextFieldInput(props: PlainTextField) {
  return (
    <>
      <input />
      <input type="checkbox" />
      <input />
    </>
  );
}

function AdminNewDocument() {
  // const createDocument = useApolloMutation<TCreateDocument, TCreateDocumentVariables>(
  //   CREATE_DOCUMENT,
  // );

  const [nextField, setNextField] = useState<FieldType>('plain_text');

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
  const fields = useField('fields', form);

  function createField(fieldType: FieldType): Field {
    const fieldBase = {
      order: fields.input.value.length + 1,
      handle: '',
      required: false,
      ...useArrayField('fields', fields.input.value.length, form),
    };

    switch (fieldType) {
      case 'plain_text':
        return { type: 'plain_text', value: '', ...fieldBase };
      case 'asset':
        return { type: 'asset', ...fieldBase };
      default:
        throw new Error(`Unhandled field type ${fieldType}.`);
    }
  }

  const addField = useCallback(
    () => {
      fields.handlers.setValue([...fields.input.value, createField(nextField)]);
    },
    [fields],
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
          value={nextField}
          setValue={setNextField}
        />
        <Button type="button" onClick={addField}>
          Add field
        </Button>
        <Button type="submit" disabled={!form.valid}>
          Create document
        </Button>
        <FieldSet>
          {fields.input.value.map(field => {
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
