/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// import nextJest from "next/jest.js";
const nextJest = require("next/jest.js");


process.env.TZ = "Europe/Amsterdam";


const createJestConfig = nextJest({
  dir: "./",
});


const config = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/utils/*.ts",
    "src/dictionaries/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      statements: 97,
      branches: 94,
      functions: 100,
      lines: 97,
    },
  },
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(config)
