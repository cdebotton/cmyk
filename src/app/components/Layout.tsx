import { padding, rem } from 'polished';
import styled from 'styled-components';

const Layout = styled.div`
  display: grid;
  perspective: 800px;
  transform-style: preserve-3d;
  ${padding(rem(0), rem(32), rem(16))};
`;

export default Layout;
