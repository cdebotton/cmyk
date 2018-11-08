import { rem } from 'polished';
import styled from 'styled-components';
import Layout from './Layout';
import PageHeading from './PageHeading';

const EditorLayout = styled(Layout)`
  grid-template-columns: ${rem(64)} auto ${rem(64)};
`;

const Heading = styled(PageHeading)`
  grid-column: 2 / span 1;
`;

export default EditorLayout;

export { Heading };
