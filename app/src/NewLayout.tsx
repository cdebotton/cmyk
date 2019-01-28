import React, { MouseEvent } from 'react';
import 'styled-components/macro';
import PageHeading from './components/PageHeading';
import { rem } from 'polished';
import { FormProvider, useForm } from './hooks/useForm2';
import Button from './components/Button';
import Input from './components/Input2';

type PlaintextField = { type: 'PLAINTEXT'; name: string };
type MarkdownField = { type: 'MARKDOWN'; name: string };
type Field = PlaintextField | MarkdownField;

type Values = {
  title: string;
  fields: Field[];
};

function NewLayout() {
  function handleSubmit(values: Values) {
    console.log(values);
  }

  const [state, dispatch] = useForm<Values>({
    initialValues: {
      title: '',
      fields: [],
    },
  });

  function handleClick(event: MouseEvent) {
    event.preventDefault();

    dispatch({
      type: 'ARRAY_ADD',
      payload: { path: 'fields', value: { type: 'PLAINTEXT', name: '' } },
    });
  }

  const {
    values: { fields },
  } = state;

  return (
    <FormProvider
      css={`
        display: grid;
        justify-content: stretch;
        align-items: center;
        grid-gap: ${rem(16)};
        grid-template-columns: [form-start col1-start] 1fr [col1-end col2-start] 1fr [col2-end form-end];
      `}
      state={state}
      dispatch={dispatch}
      onSubmit={handleSubmit}
    >
      <PageHeading css="grid-column: form-start / form-end" level={4}>
        New layout
      </PageHeading>
      <Input path="title" label="Title" />
      <Button type="button" onClick={handleClick}>
        Add Field
      </Button>
      {fields.map((_, i) => {
        return (
          <>
            <Input
              css="grid-column: form-start / form-end"
              label="Field title"
              path={`fields[${i}].title`}
            />
          </>
        );
      })}
      <Button type="submit">Save</Button>
    </FormProvider>
  );
}

export default NewLayout;
