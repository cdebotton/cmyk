import { rem } from 'polished';
import styled from 'styled-components';
import { foreground, gradient } from '../styles/helpers';

const Badge = styled.span`
  font-size: ${rem(12)};
  padding: ${rem(4)};
  border-radius: 3px;
  ${foreground({ shade: 1 })};
  ${gradient({ steps: 2 })};
`;

export default Badge;
