import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import ListLayout, { Heading } from './components/ListLayout';
import Title from './containers/Title';

const Url = styled.code`
  background-color: #eee;
`;

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

function NotFound({ match, className }: IProps) {
  return (
    <ListLayout className={className}>
      <Title>Not found</Title>
      <Heading>Whoops, we can't find that</Heading>
      <p>
        Nothing exists for the requested url, `<Url>{match.url}</Url>
        `.
      </p>
    </ListLayout>
  );
}

export default NotFound;
