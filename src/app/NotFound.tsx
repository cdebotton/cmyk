import React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Heading from './components/Heading';
import PageLayout from './components/PageLayout';

const Url = styled.code`
  background-color: #eee;
`;

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

function NotFound({ match, className }: IProps) {
  return (
    <PageLayout className={className}>
      <Heading>Whoops, we can't find that</Heading>
      <p>
        Nothing exists for the requested url, `<Url>{match.url}</Url>
        `.
      </p>
    </PageLayout>
  );
}

export default hot(module)(styled(NotFound)`
  position: relative;
`);
