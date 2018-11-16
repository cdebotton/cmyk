import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import ListLayout, { Heading } from './components/ListLayout';
import useTitle from './hooks/useTitle';

const Url = styled.code`
  background-color: #eee;
`;

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

function NotFound({ match, className }: IProps) {
  useTitle('Not found');

  return (
    <ListLayout className={className}>
      <Heading>Whoops, we can't find that</Heading>
      <p>
        Nothing exists for the requested url, `<Url>{match.url}</Url>
        `.
      </p>
    </ListLayout>
  );
}

export default NotFound;
