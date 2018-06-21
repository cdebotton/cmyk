const { NODE_ENV = 'development' } = process.env;

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        useBuiltIns: 'entry',
        loose: true,
      },
    ],
    ['@babel/stage-0', { decoratorsLegacy: true, loose: true }],
    '@babel/typescript',
  ],
  plugins: ['universal-import'],
};
