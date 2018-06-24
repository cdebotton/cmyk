import React, { SFC, ReactNode } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Avatar from '../atoms/Avatar';
import colors from '../../theme/colors';

type Props = {
  className?: string;
  flat?: boolean;
  depth?: number;
  title: ReactNode;
  pages: ReactNode;
  actions?: ReactNode;
};

const TitleComponent: SFC<{ vertical?: boolean }> = ({
  vertical: _,
  ...props
}) => <div {...props} />;

const Title = styled(TitleComponent)`
  position: relative;
  margin: ${rem(10)} 0;
  writing-mode: ${props => (props.vertical ? 'vertical-lr' : 'inherit')};
`;

const PagesContainer = styled.div`
  position: relative;
`;

const ActionsContainer = styled.div`
  position: relative;
`;

const AdminNavBar: SFC<Props> = ({
  actions,
  className,
  pages,
  title,
  flat,
}) => (
  <nav className={className}>
    <Title vertical={flat}>{title}</Title>
    <Avatar url="https://placeimg.com/64/64" />
    <PagesContainer>{pages}</PagesContainer>
    {actions && <ActionsContainer>{actions}</ActionsContainer>}
  </nav>
);

export default styled(AdminNavBar)`
  position: relative;
  display: grid;
  background-color: ${colors.palette.dark[1]};
  grid-template-rows: min-content min-content auto min-content;
`;
