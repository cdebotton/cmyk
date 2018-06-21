import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {
  className?: string;
  left: ReactNode;
  right: ReactNode;
};

const SplitLayout: SFC<Props> = ({ className, left, right }) => (
  <div className={className}>
    {left}
    {right}
  </div>
);

export default styled(SplitLayout)`
  display: grid;
  grid-gap: ${rem(20)};
  grid-template-columns: 1fr 1fr;
`;
