export default {
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'node',
  testTimeout: 30000,

  extensionsToTreatAsEsm: ['.ts'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json',
      },
    ],
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  testMatch: ['**/*.test.ts'],

  setupFiles: [
    '<rootDir>/src/tests/testSetup.ts'
  ],

  setupFilesAfterEnv: [
    '<rootDir>/src/tests/dbSetup.ts',
    '<rootDir>/src/tests/setup.ts'
  ],

  clearMocks: true,
  verbose: true,
};