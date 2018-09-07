const { BABEL_TARGET = 'node' } = process.env;

const env =
  BABEL_TARGET === 'node'
    ? {
        targets: {
          node: 'current',
        },
      }
    : {
        targets: {
          browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
        },
        modules: false,
      };

module.exports = {
  presets: [['@babel/env', env], '@babel/typescript', '@babel/react'],
  plugins: [
    '@babel/syntax-dynamic-import',
    '@babel/proposal-object-rest-spread',
    '@babel/proposal-class-properties',
    [
      'babel-plugin-styled-components',
      {
        displayName: process.env.NODE_ENV === 'development',
        fileName: process.env.NODE_ENV === 'development',
      },
    ],
  ],
};
