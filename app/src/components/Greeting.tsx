import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import Heading from './Heading';

interface Props {
  className?: string;
  message: string;
  name: string;
}

const GreetingContainer = styled(Heading).attrs({ level: 1 })`
  display: flex;
  flex-flow: column nowrap;
  font-family: 'Raleway', sans-serif;
  line-height: 1.6;
  font-weight: 300;
`;

const Message = styled.span`
  font-size: ${rem(12)};
`;

const Name = styled.span`
  font-size: ${rem(24)};
`;

function Greeting({ message, name, className }: Props) {
  return (
    <GreetingContainer className={className}>
      <Message>{message},</Message>
      <Name>{name}</Name>
    </GreetingContainer>
  );
}

export default Greeting;
