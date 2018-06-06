const path = require('path');
const webpack = require('webpack');
const { StatsWriterPlugin } = require('./scripts/StatsWriterPlugin');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: { bundle: path.join(__dirname, 'src', 'client', 'index.tsx') },
  output: {
    filename: '[name].js',
    publicPath:
      NODE_ENV === 'development' ? 'https://localhost:3001/' : '/dist/',
    path: path.join(__dirname, 'dist', 'client'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    runtimeChunk: {
      name: 'bootstrap',
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: ['> 0.25%', 'not ie 11', 'not op_mini all'],
                    },
                    modules: false,
                    loose: true,
                    useBuiltIns: 'entry',
                  },
                ],
                [
                  '@babel/stage-0',
                  {
                    decoratorsLegacy: true,
                  },
                ],
                '@babel/react',
                '@babel/typescript',
              ],
              plugins: [
                'universal-import',
                [
                  'styled-components',
                  {
                    ssr: true,
                    displayName: NODE_ENV === 'development',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.optimize.SplitChunksPlugin(),
    new StatsWriterPlugin({ filename: 'src/generated/stats.json' }),
  ],
};
