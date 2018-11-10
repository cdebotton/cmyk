import { padding, rem } from 'polished';
import styled from 'styled-components';
import Layout from './Layout';
import PageHeading from './PageHeading';

const EditorLayout = styled(Layout)`
  grid-template-columns: ${rem(64)} auto ${rem(64)};
`;

const Heading = styled(PageHeading)`
  grid-column: 2 / span 1;
`;

const Form = styled.form`
  grid-column: 2 / span 1;
  grid-gap: ${rem(16)};
  display: grid;
  grid-template-columns: ${rem(128)} repeat(4, 1fr);
  align-content: start;
  ${padding(0, rem(32))};
`;

export default EditorLayout;

export { Form, Heading };
