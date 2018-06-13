import styled from 'styled-components';
import { rem } from 'polished';

const Badge = styled.span`
  padding: ${rem(4)} ${rem(6)};
  background-color: hsla(180, 50%, 50%, 0.8);
  border-radius: 4px;
  box-shadow: 2px 2px 4px hsla(0, 0%, 0%, 0.3);
  color: #fff;
  font-size: ${rem(10)};
  font-weight: 800;
`;

export default Badge;
