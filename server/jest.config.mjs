export default {
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'node',

  extensionsToTreatAsEsm: ['.ts'],

  globals: {
    'ts-jest': {
      useESM: true,
    },
  },

  roots: ['<rootDir>/src/tests'],

  testMatch: ['**/*.test.ts'],

  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  clearMocks: true,
  verbose: true,
};