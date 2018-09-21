import { rem } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gradient } from '../styles/helpers';

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: ${rem(12)};
  padding: ${rem(8)};
  border-radius: 3px;
  font-weight: normal;
  font-family: 'Roboto';
  text-transform: uppercase;
  ${gradient({ steps: 2 })};
`;

export default ButtonLink;
