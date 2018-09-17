import React, { FormEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  onFileChange: FormEventHandler<HTMLInputElement>;
}

function ImageSelector({ className, onFileChange }: Props) {
  return (
    <ImageSelectorContainer className={className}>
      <input onChange={onFileChange} type="file" />
    </ImageSelectorContainer>
  );
}

const ImageSelectorContainer = styled.span``;

export default ImageSelector;
