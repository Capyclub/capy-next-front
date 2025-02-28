import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
    moduleNameMapper: {
      "^msw/node$": "<rootDir>/node_modules/msw/lib/node/index.js"
    },
};

export default createJestConfig(config);
