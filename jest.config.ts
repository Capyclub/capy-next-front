/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transformIgnorePatterns: ["/node_modules/(?!.*\\.mjs$)"],
};

export default config;
