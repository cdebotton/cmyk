import styled from 'styled-components';
import { rem } from 'polished';
import { theme } from '../../styles/theme';

const Button = styled.button`
  position: relative;
  padding: ${rem(10)} ${rem(5)};
  border: none;
  cursor: pointer;

  &:active,
  &:focus {
    outline: none;
  }
`;

export default theme(Button);
