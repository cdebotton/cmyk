import styled from 'styled-components';

type BorderStyleFn = (props: { grow?: boolean }) => string;

const getBorderTransform: BorderStyleFn = props => {
  if (props.grow) {
    return 'scaleX(1)';
  }

  return 'scaleX(0)';
};

const InputBorder = styled.span`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #aff;
  transform: ${getBorderTransform};
  transition: all 175ms ease-in-out;
`;

export default InputBorder;
