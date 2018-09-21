import { rem, size } from 'polished';
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
      {imageUrl && <CardImage src={imageUrl} />}
      <CardTitle>
        {title}
        {badge && <CardBadge>{badge}</CardBadge>}
      </CardTitle>
      {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
    </CardContainer>
  );
}

const CardContainer = styled.span`
  display: grid;
  position: relative;
  align-content: start;
  align-items: start;
  grid-template-columns: min-content auto;
  grid-template-rows: repeat(4, min-content);
  grid-gap: ${rem(4)} ${rem(16)};
`;

const CardImage = styled.img`
  grid-row: 1 / span 4;
  grid-column: 1 / span 1;
  border-radius: 50%;
  object-fit: cover;
  ${size(rem(64))};
`;

const CardTitle = styled.span`
  font-weight: bold;
  font-size: ${rem(16)};
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
`;

const CardSubtitle = styled.span`
  font-size: ${rem(14)};
  grid-column: 2 / span 1;
  grid-row: 3 / span 1;
`;

const CardBadge = styled.span`
  margin-left: ${rem(8)};
`;

export default Card;
