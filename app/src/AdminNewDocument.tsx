import gql from 'graphql-tag';
import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import * as yup from 'yup';
import Button from './components/Button';
import EditorLayout, { Heading } from './components/EditorLayout';
import Input from './components/Input2';
import 'styled-components/macro';
import { useQuery } from 'react-apollo-hooks';
import { NewDocument } from './types';
import Popover from './components/Popover';
import NewLayout from './NewLayout';
import { useForm, FormProvider } from './hooks/useForm2';
import Select from './components/Select2';
import { rem, padding } from 'polished';

const NEW_DOCUMENT_QUERY = gql`
  query NewDocument {
    layouts {
      id
      title
    }
  }
`;

type Values = {
  title: string;
};

const validationSchema = yup.object().shape({
  title: yup.string().required(),
});

const NEW_LAYOUT = 'NEW_LAYOUT';

function AdminNewDocument() {
  const { data } = useQuery<NewDocument>(NEW_DOCUMENT_QUERY);

  const [state, dispatch] = useForm({
    initialValues: {
      title: '',
    },
  });

  const layoutOptions = useMemo(() => {
    return [
      {
        label: 'New layout',
        value: NEW_LAYOUT,
      },
      ...data.layouts.map(layout => {
        return {
          value: layout.id,
          label: layout.title,
        };
      }),
    ];
  }, [data.layouts]);

  const handleLayoutChange = useCallback((value: string) => {
    if (value === NEW_LAYOUT) {
      setShowNewLayoutForm(true);
    }
  }, []);

  const [showNewLayoutForm, setShowNewLayoutForm] = useState(false);
  const newLayoutSelectRef = useRef(null);

  function handleSubmit(values: Values) {
    console.log(values);
  }

  return (
    <EditorLayout>
      <Heading>New document</Heading>
      <FormProvider
        css={`
          grid-column: 2 / span 1;
          grid-gap: ${rem(16)};
          display: grid;
          grid-template-columns: ${rem(128)} repeat(4, 1fr);
          align-content: start;
          ${padding(0, rem(32))};
          align-items: center;
          grid-template-columns: [form-start col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end col4-start] 1fr [col4-end form-end];
        `}
        state={state}
        dispatch={dispatch}
        onSubmit={handleSubmit}
      >
        <Input css="grid-column: col1-start / col2-end;" path="title" label="Title" />
        <Select
          css="grid-column: col3-start / col4-end"
          ref={newLayoutSelectRef}
          path="layout"
          label="Layout"
          options={layoutOptions}
        />
        <Button type="submit">Create document</Button>
      </FormProvider>
      <Popover anchor={newLayoutSelectRef} hidden={!showNewLayoutForm} minWidth={400}>
        <NewLayout />
      </Popover>
    </EditorLayout>
  );
}

export default AdminNewDocument;
