const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = {
  plugins: [new TSDocgenPlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: 'babel-loader',
      },
    ],
  },
};
