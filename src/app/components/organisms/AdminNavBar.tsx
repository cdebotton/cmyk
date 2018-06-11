import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Avatar from '../atoms/Avatar';
import CMYKLogo from '../molecules/CMYKLogo';
import PageLink from '../molecules/PageLink';
import colors from '../../theme/colors';

type Props = {
  className?: string;
  title: ReactNode;
  pages: ReactNode;
  actions: ReactNode;
};

const Title = styled.div`
  position: relative;
  margin: ${rem(10)} 0;
  writing-mode: vertical-lr;
`;

const PagesContainer = styled.div`
  position: relative;
`;

const ActionsContainer = styled.div`
  position: relative;
`;

const AdminNavBar: SFC<Props> = ({ actions, className, pages, title }) => (
  <nav className={className}>
    <Title>
      <CMYKLogo level={1}>{title}</CMYKLogo>
    </Title>
    <Avatar />
    <PagesContainer>{pages}</PagesContainer>
    <ActionsContainer>{actions}</ActionsContainer>
  </nav>
);

export default styled(AdminNavBar)`
  position: relative;
  display: grid;
  background-color: ${colors.palette.dark[1]};
  grid-template-rows: min-content min-content auto min-content;
`;
