import { rem } from 'polished';
import styled from 'styled-components';
import PageLayout from './PageLayout';

const InsetLayout = styled(PageLayout)`
  grid-template-columns: minmax(${rem(32)}, auto) minmax(auto, ${rem(1280)}) minmax(
      ${rem(32)},
      auto
    );
  perspective: 800px;
  transform-style: preserve-3d;
`;

export default InsetLayout;
