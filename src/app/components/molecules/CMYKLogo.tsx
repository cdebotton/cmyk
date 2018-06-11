import React, { SFC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import colors from '../../theme/colors';
import Heading from '../atoms/Heading';

type Props = {
  className?: string;
  level?: number;
};

const CMYKLogo: SFC<Props> = ({ className, children, level = 3 }) => (
  <Heading level={level} className={className}>
    {children}
  </Heading>
);

export default styled(CMYKLogo)`
  position: relative;
  padding: ${rem(20)} 0;
  margin: 0;
  color: ${colors.palette.dark[0]};
`;
