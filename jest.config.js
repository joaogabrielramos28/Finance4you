module.exports = {
  testMatch: ["**/__tests__/**/*.spec.tsx"],
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules", "/android", "/ios"],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  setupFiles: ["./setupFile.js"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.spec.{ts,tsx}"],
  coverageReporters: ["lcov"],
};
