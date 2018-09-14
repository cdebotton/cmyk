import { rem } from 'polished';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { gradient } from '../styles/helpers';

interface Props {
  className?: string;
  title: ReactNode;
  imageUrl?: string;
  subtitle?: ReactNode;
  badge?: ReactNode;
}

function Card({ className, title, subtitle, badge, imageUrl }: Props) {
  return (
    <CardContainer className={className}>
      <CardTitle>
        {title}
        {badge && <CardBadge>{badge}</CardBadge>}
      </CardTitle>
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    </CardContainer>
  );
}

const CardContainer = styled.span`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  padding-left: ${rem(32)};
  overflow: hidden;
`;

const CardTitle = styled.span`
  font-weight: bold;
  font-size: ${rem(16)};
`;

const CardSubtitle = styled.span`
  font-size: ${rem(14)};
  margin-top: ${rem(8)};
`;

const CardBadge = styled.span`
  margin-left: ${rem(8)};
`;

export default Card;
