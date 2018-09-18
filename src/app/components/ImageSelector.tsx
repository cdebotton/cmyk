import { rem } from 'polished';
import React, { ChangeEventHandler, Component, FormEventHandler } from 'react';
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

interface State {
  currentUrl: string | ArrayBuffer | null;
}

class ImageSelector extends Component<Props, State> {
  public state = { currentUrl: null };

  public render() {
    const { className, file, onFileChange } = this.props;

    return (
      <ImageSelectorContainer className={className}>
        {file && <Image src={this.state.currentUrl || file.url} />}
        <input onChange={this.onFileChange} type="file" />
      </ImageSelectorContainer>
    );
  }

  private onFileChange: ChangeEventHandler<HTMLInputElement> = event => {
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
  };
}

const Image = styled.img`
  height: ${rem(64)};
`;

const ImageSelectorContainer = styled.span``;

export default ImageSelector;
