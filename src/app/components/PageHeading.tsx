import { padding, rem } from 'polished';
import styled from 'styled-components';
import Heading from './Heading';

const PageHeading = styled(Heading)`
  ${padding(rem(32))};
`;

export default PageHeading;
