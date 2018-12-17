import React from 'react';
import { useForm, useField } from './hooks/useForm';
import Input from './components/Input';
import styled from 'styled-components';
import PageHeading from './components/PageHeading';
import Select from './components/Select';

const Form = styled.form`
  display: grid;
  justify-content: stretch;
  align-content: start;
  grid-template-columns: [form-start title-start] min-content [title-end button-start] auto [button-end form-end];
`;

const FieldSelect = styled(Select)`
  grid-column: form-start / form-end;
`;

const TitleField = styled(Input)`
  grid-column: form-start / form-end;
`;

enum FieldConfig {
  plainText = 'plain_text',
  assets = 'assets',
}

function NewLayout() {
  const form = useForm({
    initialValues: {
      title: '',
    },
    onSubmit: () => {},
  });

  const title = useField(form, 'title');

  return (
    <Form>
      <PageHeading level={4}>New layout</PageHeading>
      <TitleField name="title" label="Title" {...title.input} {...title.meta} />
      <FieldSelect
        name="fieldType"
        label="Add field"
        value={null}
        options={[
          {
            label: 'Plain text',
            value: FieldConfig.plainText,
          },
          {
            label: 'Assets',
            value: FieldConfig.assets,
          },
        ]}
        change={value => alert(value)}
      />
    </Form>
  );
}

export default NewLayout;
