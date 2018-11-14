import { rem } from 'polished';
import styled from 'styled-components';
import ButtonLink from './ButtonLink';
import Layout from './Layout';
import PageHeading from './PageHeading';

const gutter = `minmax(${rem(16)}, auto)`;

const ListLayout = styled(Layout)`
  grid-gap: ${rem(16)};
  grid-template-columns: ${gutter} minmax(auto, ${rem(1680)}) ${gutter};
  align-content: start;
`;

const Heading = styled(PageHeading)`
  grid-column: 2 / span 1;
`;

const CreateLink = styled(ButtonLink)`
  grid-column: 2 / span 1;
  justify-self: start;
`;

export default ListLayout;

export { Heading, CreateLink };
