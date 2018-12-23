import React, { useCallback, useRef } from 'react';
import { useForm, useField } from './hooks/useForm';
import Input from './components/Input';
import styled from 'styled-components/macro';
import PageHeading from './components/PageHeading';
import Select from './components/Select';
import { rem } from 'polished';

const Form = styled.form`
  display: grid;
  justify-content: stretch;
  align-items: center;
  grid-gap: ${rem(16)};
  grid-template-columns: [form-start col1-start] 1fr [col1-end col2-start] 1fr [col2-end form-end];
`;

enum FieldConfig {
  plainText = 'plain_text',
  assets = 'assets',
}

type Form = {
  title: string;
  fieldConfigs: FieldConfig[];
};

function PlainTextField() {
  return <>PlainText</>;
}

function AssetsField() {
  return <>Assets</>;
}

function NewLayout() {
  const form = useForm<Form>({
    initialValues: {
      title: '',
      fieldConfigs: [],
    },
    onSubmit: () => {},
  });

  const title = useField(form, 'title');
  const fieldConfigs = useField(form, 'fieldConfigs');

  const lastKey = useRef(0);

  const addField = useCallback(
    (value: FieldConfig) => {
      fieldConfigs.change([...fieldConfigs.value, value]);
    },
    [fieldConfigs],
  );

  return (
    <Form>
      <PageHeading css="grid-column: form-start / form-end" level={4}>
        New layout
      </PageHeading>
      <Input
        css="grid-column: col1-start / col1-end"
        name="title"
        label="Title"
        {...title.input}
        {...title.meta}
      />
      <Select
        css="grid-column: col2-start / col2-end"
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
        change={addField}
      />
      <ul
        css="grid-column: form-start/ form-end; margin: 0; padding: 0; list-style: none"
        hidden={fieldConfigs.value.length === 0}
      >
        {fieldConfigs.value.map(value => {
          switch (value) {
            case 'plain_text':
              return (
                <li key={`PLAIN_TEXT:${lastKey.current++}`}>
                  <PlainTextField />
                </li>
              );
            case 'assets':
              return (
                <li key={`ASSETS:${lastKey.current++}`}>
                  <AssetsField />
                </li>
              );
          }
        })}
      </ul>
    </Form>
  );
}

export default NewLayout;
