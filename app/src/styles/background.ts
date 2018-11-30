import { css, keyframes } from 'styled-components';

const ScrollAnimation = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: -300vw -300vh;
  }
`;

export default css`
  background-attachment: fixed;
  background-size: 400vw 400vh;
  background-image: linear-gradient(
    to top left,
    hsl(352, 50%, 50%),
    hsl(342, 50%, 50%),
    hsl(332, 50%, 50%),
    hsl(322, 50%, 50%),
    hsl(312, 50%, 50%),
    hsl(302, 50%, 50%),
    hsl(292, 50%, 50%),
    hsl(282, 50%, 50%),
    hsl(272, 50%, 50%),
    hsl(262, 50%, 50%),
    hsl(252, 50%, 50%),
    hsl(242, 50%, 50%),
    hsl(232, 50%, 50%),
    hsl(222, 50%, 50%),
    hsl(212, 50%, 50%),
    hsl(202, 50%, 50%),
    hsl(192, 50%, 50%),
    hsl(182, 50%, 50%),
    hsl(172, 50%, 50%),
    hsl(162, 50%, 50%)
  );
  /* animation: ${ScrollAnimation} 120s linear infinite alternate; */
  transform: translate3d(0, 0, 0);
`;
