/** @type {import('jest').Config} */
import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  testEnvironment: "jest-environment-jsdom",
};

export default config;

// module.exports = {
//   // setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
//   testEnvironment: "jest-environment-jsdom",
//   transform: {
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
//   moduleFileExtensions: ["jsx", "js","json"],
//   moduleNameMapper: {
//     '\\.css$': 'identity-obj-proxy',
//   },
//   modulePaths: ['<rootDir>/src/'],

// };
