import React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Heading from './components/Heading';

const Url = styled.code`
  background-color: #eee;
`;

interface IProps extends RouteComponentProps<{}> {}

function NotFound({ match }: IProps) {
  return (
    <>
      <Heading>Whoops, we can't find that</Heading>
      <p>
        Nothing exists for the requested url, `<Url>{match.url}</Url>
        `.
      </p>
    </>
  );
}

export default NotFound;
