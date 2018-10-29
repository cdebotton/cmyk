import React, { CSSProperties } from 'react';
import { createResource } from 'react-cache';
import { animated } from 'react-spring';
import styled from 'styled-components';

const ImageResource = createResource(
  (src: string) =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = resolve;
      img.src = src;
    }),
);

const ImgStyled = styled(animated.img)`
  position: relative;
`;

interface Props {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

function Img({ className, src, alt }: Props) {
  ImageResource.read(src);
  return <ImgStyled className={className} src={src} alt={alt} />;
}

export default Img;
