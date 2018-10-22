import { padding, rem } from 'polished';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: ${rem(12)};
  padding: ${rem(8)};
  border-radius: 3px;
  font-weight: normal;
  font-family: 'Roboto', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  background-color: hsla(0, 0%, 100%, 0.25)};
  ${padding(rem(8))};
`;

export default ButtonLink;
