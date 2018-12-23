import gql from 'graphql-tag';
import React, { useMemo, useCallback, useState, useRef } from 'react';
import * as yup from 'yup';
import Button from './components/Button';
import EditorLayout, { Form, Heading } from './components/EditorLayout';
import Input from './components/Input';
import { useField, useForm } from './hooks/useForm';
import styled from 'styled-components/macro';
import { useQuery } from './hooks/useApollo';
import { NewDocument } from './types';
import Select from './components/Select';
import Popover from './components/Popover';
import NewLayout from './NewLayout';

const NEW_DOCUMENT_QUERY = gql`
  query NewDocument {
    layouts {
      id
      title
    }
  }
`;

const DocumentForm = styled(Form)`
  grid-template-columns: [form-start col1-start] 1fr [col1-end col2-start] 1fr [col2-end col3-start] 1fr [col3-end col4-start] 1fr [col4-end form-end];
`;

const validationSchema = yup.object().shape({
  title: yup.string().required(),
});

const NEW_LAYOUT = 'NEW_LAYOUT';

function AdminNewDocument() {
  const { data } = useQuery<NewDocument>(NEW_DOCUMENT_QUERY);

  const form = useForm({
    validationSchema,
    initialValues: {
      title: '',
      layout: null,
    },
    onSubmit: async values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const title = useField(form, 'title');
  const layout = useField(form, 'layout');

  const layoutOptions = useMemo(
    () => {
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
    },
    [data.layouts],
  );

  const handleLayoutChange = useCallback((value: string) => {
    if (value === NEW_LAYOUT) {
      setShowNewLayoutForm(true);
    }
  }, []);

  const [showNewLayoutForm, setShowNewLayoutForm] = useState(false);
  const newLayoutSelectRef = useRef(null);

  return (
    <EditorLayout>
      <Heading>New document</Heading>
      <DocumentForm onSubmit={form.handleSubmit}>
        <Input
          css="grid-column: col1-start / col2-end;"
          name="title"
          label="Title"
          {...title.input}
          {...title.meta}
        />
        <Select
          {...layout.input}
          css="grid-column: col3-start / col4-end"
          ref={newLayoutSelectRef}
          name="layout"
          label="Layout"
          options={layoutOptions}
          change={handleLayoutChange}
        />
        <Popover anchor={newLayoutSelectRef} hidden={!showNewLayoutForm} minWidth={400}>
          <NewLayout />
        </Popover>
        <Button type="submit" disabled={!form.valid}>
          Create document
        </Button>
      </DocumentForm>
    </EditorLayout>
  );
}

export default AdminNewDocument;
