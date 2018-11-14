import { padding, rem } from 'polished';
import styled from 'styled-components';

const PageLayout = styled.div`
  display: grid;
  align-content: start;
  justify-content: stretch;
  grid-gap: ${rem(16)};
  ${padding(rem(0), rem(32), rem(16))};
`;

export default PageLayout;
