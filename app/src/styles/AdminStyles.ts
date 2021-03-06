import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  ${normalize()};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    user-select: none;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: Roboto, sans-serif;
  }

  ::selection {
    background-color: hsla(300, 100%, 50%, 0.5);
  }

  a {
    color: hsla(212, 50%, 50%, 1.0);
  }
`;

export default GlobalStyles;
