const path = require('path');
const webpack = require('webpack');

const { NODE_ENV = 'development' } = process.env;
const __PROD__ = NODE_ENV === 'production';

const mode = __PROD__ ? 'production' : 'development';
const publicPath = __PROD__ ? 'dist/' : 'https://localhost:3001/';
const build = __PROD__ ? 'production.min' : 'development';

module.exports = {
  mode,
  entry: path.join(__dirname, 'src/app/index.tsx'),
  output: {
    publicPath,
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/app'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      react: path.join(__dirname, `vendor/react/build/dist/react.${build}.js`),
      'react-dom': path.join(
        __dirname,
        `vendor/react/build/dist/react-dom.${build}.js`,
      ),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'${NODE_ENV}'`,
      },
    }),
  ],
};
