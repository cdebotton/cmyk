import styled from 'styled-components';
import { SFC, ReactType, createElement } from 'react';

type Props = {
  component?: ReactType<any>;
  url: string;
};

const Avatar: SFC<Props> = ({ component = 'span', url: _, ...props }) =>
  createElement(component, props);

export default styled(Avatar)`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-image: url(${props => props.url});
  background-size: cover;
  border-radius: 50%;
`;
