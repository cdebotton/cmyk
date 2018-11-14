import { rem } from 'polished';
import React, { ErrorInfo } from 'react';
import styled from 'styled-components';
import Heading from './components/Heading';

interface IProps {
  className?: string;
  error: Error;
  info: ErrorInfo;
}

const ErrorTrace = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Report = styled.div`
  padding: ${rem(16)};
  font-family: monospace;
  line-height: 1.6;
  background-color: hsla(0, 50%, 50%, 1);
`;

function ClientError({ className, error, info }: IProps) {
  const trace = info.componentStack
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  return (
    <div className={className}>
      <Heading level={1}>Uh oh.</Heading>
      <Heading level={2}>Looks like there as a problem!</Heading>

      <Report>
        <Heading level={4}>
          {error.name}: {error.message}
        </Heading>
        <ErrorTrace>
          {trace.map((ln, index) => (
            <li key={`ERROR_LINE_${index}`}>{ln}</li>
          ))}
        </ErrorTrace>
      </Report>
    </div>
  );
}

export default styled(ClientError)`
  position: relative;
`;
