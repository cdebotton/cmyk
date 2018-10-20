import React, { SVGProps } from 'react';
import { animated, Spring } from 'react-spring';
import styled from 'styled-components';
import Toggle from '../containers/Toggle';

export const states = {
  disabled: {
    leftPath: 'M 20 20 L 20 44',
    rightPath: 'M 44 20 L 44 44',
    strokePath: '2px',
  },
  large: {
    leftPath: 'M 10 10 L 54 54',
    rightPath: 'M 54 10 L 10 54',
    strokePath: '4px',
  },
  small: {
    leftPath: 'M 24 24 L 40 40',
    rightPath: 'M 40 24 L 24 40',
    strokePath: '2px',
  },
};

interface Props extends SVGProps<SVGElement> {
  className?: string;
}

function AnimatedCross({ className, ...props }: Props) {
  return (
    <Toggle>
      {({ on, setOn, setOff }) => {
        const state = on ? states.large : states.small;

        return (
          <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            onMouseEnter={event => {
              setOn();

              if (props.onMouseEnter) {
                props.onMouseEnter(event);
              }
            }}
            onMouseLeave={event => {
              setOff();

              if (props.onMouseLeave) {
                props.onMouseLeave(event);
              }
            }}
          >
            <Spring native to={state}>
              {({ leftPath, rightPath, strokePath }) => (
                <>
                  <animated.path
                    d={leftPath}
                    fill="transparent"
                    strokeWidth={strokePath}
                    strokeLinecap="round"
                    stroke="#fff"
                  />
                  <animated.path
                    d={rightPath}
                    fill="transparent"
                    strokeWidth={strokePath}
                    strokeLinecap="round"
                    stroke="#fff"
                  />
                </>
              )}
            </Spring>
          </svg>
        );
      }}
    </Toggle>
  );
}

export default styled(AnimatedCross)``;
