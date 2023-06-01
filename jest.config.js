module.exports = {
  testMatch: ['**/src/**/(*.)+(spec|test).[t]s?(x)', '!**/dist/**/*.*'],
  collectCoverage: false,
  transform: {
    '.(ts)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  clearMocks: true,
  coverageDirectory: 'reports/coverage-jest',
  coverageReporters: ['text', 'lcov', 'cobertura', 'json'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', 'src/*.{ts,tsx}', '!**/node_modules/**'],
  testEnvironment: 'node',
};
