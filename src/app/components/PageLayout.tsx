import { padding, rem } from 'polished';
import styled from 'styled-components';

const PageLayout = styled.div`
  display: grid;
  align-content: start;
  justify-content: stretch;
  grid-gap: ${rem(16)};
  ${padding(0)};
`;

export default PageLayout;
