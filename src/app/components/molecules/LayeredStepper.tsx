import React, { SFC, ComponentType } from 'react';
import styled from 'styled-components';
import { Route, RouteComponentProps, matchPath } from 'react-router';
import posed, { PoseGroup } from 'react-pose';
import colors from '../../theme/colors';
import { darken, rem } from 'polished';

type Layer = {
  layer: number;
  path: string | undefined;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
};

type Props = {
  pathname: string;
  className?: string;
  layers: Layer[];
};

const filterLayer = (pathname: string) => (layer: Layer) => {
  return matchPath(pathname, layer) !== null;
};

const LayeredStepper: SFC<Props> = ({ className, layers, pathname }) => (
  <div className={className}>
    <PoseGroup>
      {layers
        .filter(filterLayer(pathname))
        .map(({ path, component: Component, layer }) => (
          <LayerContainer layer={layer} key={`LAYER_${path}`}>
            <Route path={path} component={Component} />
          </LayerContainer>
        ))}
    </PoseGroup>
  </div>
);

export default styled(LayeredStepper)`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000;
  transform-style: preserve-3d;
`;

type LayerStyleFn = (props: { layer: number }) => string | number;

const getLayerContainerZIndex: LayerStyleFn = props => {
  return 10 + props.layer;
};

const getLayerContainerBackground: LayerStyleFn = props => {
  return `
    linear-gradient(
      to bottom right,
      ${darken(props.layer * 0.01, '#fff')},
      ${darken(props.layer * 0.075, '#fff')}
    );
  `;
};

const getLayerContainerMarginLeft: LayerStyleFn = props => {
  return `${(props.layer - 1) * 5}vw`;
};

const getLayerContainerWidth = (props: { layer: number }) => {
  return `calc(100% - ${getLayerContainerMarginLeft(props)})`;
};

const LayerContainerPoses = posed.div({
  enter: {
    x: 0,
    transition: {
      x: { type: 'spring', mass: 0.5 },
    },
  },
  exit: {
    x: '100%',
    transition: {
      x: { type: 'spring' },
    },
  },
});

const LayerContainer = styled(LayerContainerPoses)`
  position: absolute;
  z-index: ${getLayerContainerZIndex};
  width: ${getLayerContainerWidth};
  height: 100%;
  padding: ${rem(20)} ${rem(40)};
  margin-left: ${getLayerContainerMarginLeft};
  background: ${getLayerContainerBackground};
  border-radius: 5px;
  box-shadow: -2px 10px 5px rgba(0, 0, 0, 0.15);
`;
