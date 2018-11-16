import { padding, rem } from 'polished';
import styled from 'styled-components';
import Layout from './Layout';
import PageHeading from './PageHeading';

const gutter = `minmax(${rem(16)}, auto)`;

const EditorLayout = styled(Layout)`
  grid-gap: ${rem(16)};
  grid-template-columns: ${gutter} minmax(auto, ${rem(1680)}) ${gutter};
  align-content: start;
`;

const Heading = styled(PageHeading)`
  grid-column: 2 / span 1;
`;

const Form = styled.form`
  grid-column: 2 / span 1;
  grid-gap: ${rem(16)};
  display: grid;
  grid-template-columns: ${rem(64)} repeat(4, 1fr);
  align-content: start;
  ${padding(0, rem(32))};
  align-items: center;
`;

export default EditorLayout;

export { Form, Heading };
