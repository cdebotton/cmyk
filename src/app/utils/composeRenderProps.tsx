import React from 'react';
import immutableGeneratorFactory from './immutableGeneratorFactory';

function composeRenderProps(generator) {
  const immutableGenerator = immutableGeneratorFactory(generator);

  function ComposedRenderPropsComponent(props) {
    function compose(context) {
      if (!context.next) {
        return context.value;
      }
      return React.cloneElement(context.value, null, function(values) {
        return compose(context.next(values));
      });
    }

    return compose(generator(props));
  }

  ComposedRenderPropsComponent.displayName = `ComposedRenderPropsComponent(${generator.displayName ||
    generator.name ||
    'anonymous'})`;

  return ComposedRenderPropsComponent;
}

export default composeRenderProps;
