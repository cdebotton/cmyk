module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: ['babel-loader', 'react-docgen-typescript-loader'],
      },
    ],
  },
};
