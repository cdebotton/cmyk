import { rem, size } from 'polished';
import React, { ChangeEventHandler, Component, FormEventHandler } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  value: string;
  name: string;
  file: {
    key: string;
    bucket: string;
    url: string;
  } | null;
  onFileChange: FormEventHandler<HTMLInputElement>;
}

interface State {
  currentUrl: string | ArrayBuffer | null;
}

class ImageSelector extends Component<Props, State> {
  state = { currentUrl: null };

  render() {
    const { className, file, onFileChange, name } = this.props;
    const { currentUrl } = this.state;
    const url = currentUrl || (file ? file.url : null);
    const id = `file-${name}`;
    return (
      <ImageSelectorContainer className={className}>
        {url && <Image src={url} />}
        <FileInput id={id} onChange={this.onFileChange} />
        <Label htmlFor={id} />
      </ImageSelectorContainer>
    );
  }

  onFileChange: ChangeEventHandler<HTMLInputElement> = event => {
    const reader = new FileReader();
    const files = event.currentTarget.files;

    if (!files || files.length === 0) {
      return;
    }

    const [file] = files;

    reader.onload = readerEvent => {
      if (!readerEvent.target) {
        return;
      }

      const result = reader.result;

      this.setState(state => ({ ...state, currentUrl: result }));
    };

    reader.readAsDataURL(file);

    this.props.onFileChange(event);
  };
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

const ImageSelectorContainer = styled.span`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default ImageSelector;
