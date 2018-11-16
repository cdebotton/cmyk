import styled from 'styled-components';
import Heading from './Heading';

const PageHeading = styled(Heading)`
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default PageHeading;
