import { rem } from 'polished';
import styled from 'styled-components';

type PlaceholderStyleFn = (props: { isLabel?: boolean }) => string;

const getPlaceholderColor: PlaceholderStyleFn = props => {
  if (props.isLabel) {
    return '#eee';
  }

  return '#aaa';
};

const getPlaceholderTransform: PlaceholderStyleFn = props => {
  if (props.isLabel) {
    return `translate3d(0, -${rem(18)}, 0)`;
  }

  return 'translate3d(0, 0, 0)';
};

const InputPlaceholder = styled.span`
  position: absolute;
  left: ${rem(5)};
  color: ${getPlaceholderColor};
  font-size: ${rem(12)};
  font-weight: bold;
  pointer-events: none;
  transform: ${getPlaceholderTransform};
  transition: all 175ms ease-in-out;
  user-select: none;
`;

export default InputPlaceholder;
