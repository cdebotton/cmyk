import gql from 'graphql-tag';
import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
// import { TCreateDocument, TCreateDocumentVariables } from './types';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import { useApolloMutation } from './hooks/Apollo';
import { useField, useForm } from './hooks/useForm';
import Select from './components/Select';
import styled from 'styled-components';
import { rem, padding } from 'polished';

const NewFieldPalette = styled.div`
  display: grid;
  grid-template-columns: auto max-content;
  position: fixed;
  bottom: ${rem(16)};
  right: ${rem(16)};
  background-color: hsla(0, 0%, 100%, 0.4);
  border-radius: 4px;
  grid-gap: ${rem(16)};
  width: ${rem(320)};
  ${padding(rem(16))};
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

type Field =
  | { type: 'plain_text'; order: number; required: boolean; handle: string; value: string }
  | { type: 'asset'; order: number; handle: string; required: boolean };

interface Form {
  title: string;
  fields: Array<{ type: FieldType }>;
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
      <Form onSubmit={form.handleSubmit}>
        <Input name="title" label="Title" {...title.input} {...title.meta} />
        <div>
          {fields.input.value.map(field => {
            return <div>{JSON.stringify(field)}</div>;
          })}
        </div>
        <Button type="submit" disabled={!form.valid}>
          Create document
        </Button>
      </Form>
      <NewFieldPalette>
        <Select
          name="fieldType"
          label="New field"
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
      </NewFieldPalette>
    </EditorLayout>
  );
}

export default AdminNewDocument;
