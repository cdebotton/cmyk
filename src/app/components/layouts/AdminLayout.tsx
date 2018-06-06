import React, { SFC } from 'react';
import styled from 'styled-components';

type Props = {
  className?: string;
  navigation: JSX.Element;
  content: JSX.Element;
};

const AdminLayout: SFC<Props> = ({ className, content, navigation }) => (
  <div className={className}>
    {navigation}
    {content}
  </div>
);

export default styled(AdminLayout)`
  display: grid;
  width: 100%;
  min-height: 100vh;
  overflow: auto;
  grid-template-rows: min-content auto;
`;
