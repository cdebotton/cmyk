import styled from 'styled-components';
import { theming } from '../../theme';

const BaseLayout = styled.div`
  position: relative;
  overflow: auto;
  width: 100vw;
  min-height: 100vh;
  ${theming()};
`;

export default BaseLayout;
