import { rem } from 'polished';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

interface Props {
  className?: string;
  isLeading?: boolean;
  label: ReactNode;
  children: ReactNode;
}

const LabeledTextContainer = styled.span`
  display: grid;
  grid-gap: ${rem(3)};
`;

const Text = styled.p<{ isLabel?: boolean; isLeading?: boolean }>`
  font-weight: 300;
  font-family: ${({ isLabel, isLeading }) =>
    isLabel && isLeading ? "'Raleway', sans-serif" : "'Roboto', sans-serif"};
  margin: 0;
  padding: 0;
  font-size: ${({ isLeading, isLabel }) =>
    isLeading && isLabel ? rem(16) : rem(12)};
  color: ${({ isLabel, isLeading }) => {
    const white = css`hsla(0, 0%, 0%, 1.0)`;
    const gray = css`hsla(0, 0%, 0%, 0.54)`;

    if (isLabel && isLeading) {
      return white;
    }

    if (!isLabel && isLeading) {
      return gray;
    }

    if (isLabel && !isLeading) {
      return gray;
    }

    if (!isLabel && !isLeading) {
      return white;
    }

    return gray;
  }};
`;

function LabeledText({ className, isLeading, label, children }: Props) {
  return (
    <LabeledTextContainer className={className}>
      <Text isLeading={isLeading} isLabel>
        {label}
      </Text>
      <Text isLeading={isLeading}>{children}</Text>
    </LabeledTextContainer>
  );
}

export default LabeledText;
