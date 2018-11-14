import { ApolloError } from 'apollo-client';
import { size } from 'polished';
import React, { ChangeEvent, FormEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  error?: ApolloError | null;
  uploading: boolean;
  name: string;
  value: {
    key: string;
    bucket: string;
    url: string;
  } | null;
  onChange: FormEventHandler<HTMLInputElement>;
}

function ImageSelector({ className, name, value, onChange, uploading }: Props) {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const url = currentUrl || (value ? value.url : null);
  const id = `file-${name}`;

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const files = event.currentTarget.files;
    if (!files || files.length === 0) {
      return;
    }

    const file = files.item(0);

    if (!file) {
      return;
    }

    reader.onload = readerEvent => {
      if (!readerEvent.target) {
        return;
      }
      const result = reader.result;
      if (result) {
        setCurrentUrl(result.toString());
      }
    };

    reader.readAsDataURL(file);
    onChange(event);
  }, []);

  return (
    <ImageSelectorContainer className={className} disabled={uploading}>
      {url && <Image src={url} />}
      {!uploading && <FileInput id={id} onChange={handleChange} />}
      <Label htmlFor={id} />
    </ImageSelectorContainer>
  );
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  display: none;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  ${size('100%')};
  cursor: pointer;
`;

const ImageSelectorContainer = styled.span<{ disabled: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export default ImageSelector;
