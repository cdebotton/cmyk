import React from 'react';
import styled from 'styled-components/macro';
import PageHeading from './components/PageHeading';
import { rem } from 'polished';
import { useForm, useField } from './hooks/useForm';
import Input from './components/Input';

const Form = styled.form`
  display: grid;
  justify-content: stretch;
  align-items: center;
  grid-gap: ${rem(16)};
  grid-template-columns: [form-start col1-start] 1fr [col1-end col2-start] 1fr [col2-end form-end];
`;

type PlaintextField = { type: 'PLAINTEXT'; name: string };
type MarkdownField = { type: 'MARKDOWN'; name: string };
type Field = PlaintextField | MarkdownField;

type Values = {
  title: string;
  fields: Field[];
};

function NewLayout() {
  const form = useForm<Values>({
    initialValues: {
      title: '',
      fields: [],
    },
    onSubmit: values => console.log(values),
  });

  const title = useField(form, 'title');

  return (
    <Form>
      <PageHeading css="grid-column: form-start / form-end" level={4}>
        New layout
      </PageHeading>
      <Input name="title" label="Title" {...title.input} {...title.meta} />
      <button type="button">Add field</button>
    </Form>
  );
}

export default NewLayout;
