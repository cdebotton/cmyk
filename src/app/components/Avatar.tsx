import { rem, size } from 'polished';
import styled from 'styled-components';

const Avatar = styled.span<{ size: number; src: string }>`
  display: inline-block;
  background-image: url(${props => props.src});
  background-size: cover;
  border-radius: 50%;
  ${props => size(rem(props.size))};
`;

export default Avatar;
