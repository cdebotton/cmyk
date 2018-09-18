import { rem } from 'polished';
import React, { FormEvent, FormEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  value: string;
  file: {
    key: string;
    bucket: string;
    url: string;
  } | null;
  onFileChange: FormEventHandler<HTMLInputElement>;
}

function ImageSelector({ className, onFileChange, file }: Props) {
  return (
    <ImageSelectorContainer className={className}>
      {file && <Image src={file.url} />}
      <input onChange={onFileChange} type="file" />
    </ImageSelectorContainer>
  );
}

const Image = styled.img`
  height: ${rem(64)};
`;

const ImageSelectorContainer = styled.span``;

export default ImageSelector;
