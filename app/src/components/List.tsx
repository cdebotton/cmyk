import { padding, position, rem, size } from 'polished';
import React, { Fragment, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import styled from 'styled-components';
import useFillToLeft from '../hooks/useFillToLeft';
import useZoomAnimation from '../hooks/useZoomAnimation';
import AnimatedCross from './AnimatedCross';
import Avatar from './Avatar';
import Tooltip from './Tooltip';

const AnimatedLi = styled(animated.li)`
  border-radius: 5px;
  ${padding(rem(8))};
  perspective: 800px;
  transform-style: preserve-3d;
`;

const DeleteFill = styled.svg`
  position: absolute;
  border-radius: inherit;
  z-index: -1;
  ${position('absolute', 0, 0)};
  ${size('100%')};
`;

function AnimatedDeleteBar(props: { on: boolean }) {
  const { fill, d } = useFillToLeft(props.on, {
    color: 'hsla(5, 50%, 50%, 0.5)',
  });

  return <animated.path fill={fill} d={d} />;
}

const ItemLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: grid;
  align-items: center;
  grid-template-columns: min-content auto ${rem(128)};
  grid-gap: 0 ${rem(16)};
  grid-auto-flow: column dense;
`;

const Image = styled(Avatar)`
  position: relative;
  border-radius: 9px;
`;

const Details = styled.dl`
  display: grid;
  grid-auto-flow: column dense;
  grid-template-columns: 2fr;
  grid-auto-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: ${rem(16)};
`;

const Title = styled.dt`
  font-size: ${rem(24)};
  font-family: 'Raleway', sans-serif;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  align-self: end;
  padding: 0;
`;

const Description = styled.dd`
  font-size: ${rem(14)};
  align-self: start;
  opacity: 0.4;
  margin: 0;
`;

const DeleteIcon = styled(animated.span)`
  font-size: ${rem(48)};
  display: grid;
  align-content: center;
  justify-content: center;
`;

interface Detail {
  label: ReactNode;
  info?: ReactNode;
}

interface Props extends Detail {
  image?: string;
  to: string;
  details?: Detail[];
  deleteTooltip?: ReactNode;
  onDelete?: VoidFunction;
}

function Item({
  image,
  to,
  label,
  info,
  details,
  onDelete,
  deleteTooltip,
}: Props) {
  const [isHoveringList, setIsHoveringList] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const zoom = useZoomAnimation(isHoveringList);

  return (
    <AnimatedLi
      onMouseEnter={() => setIsHoveringList(true)}
      onMouseLeave={() => setIsHoveringList(false)}
      style={zoom}
    >
      <DeleteFill preserveAspectRatio="none" viewBox="0 0 100 100">
        <AnimatedDeleteBar on={isHoveringDelete} />
      </DeleteFill>
      <ItemLink to={to}>
        {image && (
          <Image
            style={{
              boxShadow: zoom.boxShadow,
              transform: zoom.transform,
            }}
            src={image}
            size={96}
          />
        )}
        <Details>
          <Title>{label}</Title>
          {info && <Description>{info}</Description>}
          {details &&
            details.map((detail, key) => (
              <Fragment key={`${label}_detailFragment_${key}`}>
                <Title>{detail.label}</Title>
                {detail.info && <Description>{detail.info}</Description>}
              </Fragment>
            ))}
        </Details>
        {isHoveringList &&
          onDelete && (
            <DeleteIcon
              onMouseEnter={() => setIsHoveringDelete(true)}
              onMouseLeave={() => setIsHoveringDelete(false)}
              onClick={event => {
                event.preventDefault();
                onDelete();
              }}
            >
              {deleteTooltip ? (
                <Tooltip content={deleteTooltip}>
                  <AnimatedCross />
                </Tooltip>
              ) : (
                <AnimatedCross />
              )}
            </DeleteIcon>
          )}
      </ItemLink>
    </AnimatedLi>
  );
}

const List = styled.ul`
  grid-column: 2 / span 1;
  display: grid;
  list-style: none;
  margin: 0;
  padding: 0;
  grid-gap: ${rem(16)};
  perspective: 800px;
`;

export default List;
export { Item };
