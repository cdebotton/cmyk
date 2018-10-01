const path = require('path');
const webpack = require('webpack');

const { NODE_ENV = 'development', PUBLIC_PATH = 'dist/' } = process.env;
const __PROD__ = NODE_ENV === 'production';

const mode = __PROD__ ? 'production' : 'development';
const build = __PROD__ ? 'production.min' : 'development';

module.exports = {
  mode,
  entry: ['@babel/polyfill', path.join(__dirname, 'src/app/index.tsx')],
  output: {
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.join(__dirname, 'dist/app'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
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
    extensions: ['.ts', '.tsx', '.js', '.mjs'],
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
