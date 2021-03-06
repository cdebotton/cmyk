module.exports = {
  presets: [['@babel/env', { targets: { node: 'current' } }], '@babel/typescript'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',
  ],
};
