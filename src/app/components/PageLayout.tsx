import { rem } from 'polished';
import styled from 'styled-components';

const PageLayout = styled.div`
  display: grid;
  padding: ${rem(16)};
  align-content: start;
  justify-content: start;
`;

export default PageLayout;
