import { rem } from 'polished';
import styled from 'styled-components';
import PageLayout from './PageLayout';

const InsetLayout = styled(PageLayout)`
  grid-template-columns: ${rem(32)} auto ${rem(32)};
  perspective: 800px;
  transform-style: preserve-3d;
`;

export default InsetLayout;
