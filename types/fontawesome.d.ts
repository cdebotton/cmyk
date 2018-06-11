declare module '@fortawesome/react-fontawesome' {
  import { ComponentType } from 'react';
  import {
    IconDefinition,
    IconName,
    IconPrefix,
  } from '@fortawesome/fontawesome-common-types';

  export interface FontAwesomeIconProps {
    border?: boolean;
    className?: string;
    fixedWidth?: boolean;
    flip?: 'horizontal' | 'vertical' | 'both';
    icon: IconDefinition | IconName | [IconPrefix, IconName];
    listItem?: boolean;
    pull?: 'right' | 'left';
    pulse?: boolean;
    mask?: string | string[] | object;
    name?: string;
    rotation?: 90 | 180 | 270;
    size?:
      | 'lg'
      | 'xs'
      | 'sm'
      | '2x'
      | '3x'
      | '4x'
      | '5x'
      | '6x'
      | '7x'
      | '8x'
      | '9x'
      | '10x';
    spin?: boolean;
    symbol?: boolean | string;
    transform?: string | { [x: string]: any };
  }

  const FontAwesomeIcon: ComponentType<FontAwesomeIconProps>;

  export default FontAwesomeIcon;
}
