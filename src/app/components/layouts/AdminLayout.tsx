import React, { SFC } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

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
  overflow: auto;
  width: 100%;
  min-height: 100vh;
  grid-template-columns: min-content auto;
`;
