module.exports = {
  collectCoverageFrom: ['**/src/**/*.ts', '**/src/**/*.tsx'],
  preset: 'ts-jest',
  rootDir: 'src',
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js'),
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
