module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
  moduleNameMapper: {
    '@core/(.*)$': ['<rootDir>/src/app/core/$1'],
    '@environments/(.*)$': ['<rootDir>/src/environments/$1'],
    '@guards/(.*)$': ['<rootDir>/src/app/core/guards/$1'],
    '@layouts/(.*)$': ['<rootDir>/src/app/core/layouts/$1'],
    '@models/(.*)$': ['<rootDir>/src/app/shared/models/$1'],
    '@pages/(.*)$': ['<rootDir>/src/app/pages/$1'],
    '@services/(.*)$': ['<rootDir>/src/app/core/services/$1'],
    '@shared/(.*)$': ['<rootDir>/src/app/shared/$1'],
    '@templates/(.*)$': ['<rootDir>/src/app/core/templates/$1'],
    '@utils/(.*)$': ['<rootDir>/src/app/core/utils/$1'],
  },
};
