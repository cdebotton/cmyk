import { rem } from 'polished';
import styled from 'styled-components';
import { color } from '../styles/helpers';

const PageLayout = styled.div`
  display: grid;
  padding: ${rem(16)};
  align-content: start;
  justify-content: start;
  background-color: ${color({ color: 'light', shade: 0 })};
`;

export default PageLayout;
