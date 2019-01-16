import React, { useState, ChangeEvent, useCallback } from 'react';
import styled from 'styled-components/macro';
import PageHeading from './components/PageHeading';
import { rem } from 'polished';
import Input from './components/Input';
import useInput from './hooks/useInput';
import { setIn } from './hooks/utils';

const Form = styled.form`
  display: grid;
  justify-content: stretch;
  align-items: center;
  grid-gap: ${rem(16)};
  grid-template-columns: [form-start col1-start] 1fr [col1-end col2-start] 1fr [col2-end form-end];
`;

type PlaintextField = {
  type: 'PLAINTEXT';
  title: string;
};

type Field = PlaintextField;

function NewLayout() {
  const [title, setTitle] = useState('');
  const titleInput = useInput(() => title, setTitle);
  const [fields, setFields] = useState<Field[]>([]);

  console.log(title);

  const handleAddField = useCallback(
    () => {
      setFields(state => [
        ...state,
        {
          type: 'PLAINTEXT',
          title: '',
        },
      ]);
    },
    [fields, setFields],
  );

  return (
    <Form>
      <PageHeading css="grid-column: form-start / form-end" level={4}>
        New layout
      </PageHeading>
      <Input css="grid-column: form-start / form-end" name="title" label="Title" {...titleInput} />
      <button type="button" onClick={handleAddField}>
        Add field
      </button>
      <ul hidden={fields.length === 0} css="grid-column: form-start / form-end">
        {fields.map((field, index) => {
          switch (field.type) {
            case 'PLAINTEXT':
              return (
                <PlaintextField
                  {...field}
                  setTitle={(value: string) =>
                    setFields(state => setIn(state, [index, 'title'], value))
                  }
                />
              );
            default:
              throw new Error(`Invalid field type ${field.type}`);
          }
        })}
      </ul>
    </Form>
  );
}

function PlaintextField<T extends { title: string; setTitle: (value: string) => void }>(props: T) {
  const titleInput = useInput(() => props.title, value => props.setTitle(value));

  return (
    <>
      <Input label="Title" name="name" {...titleInput} />
    </>
  );
}

export default NewLayout;
