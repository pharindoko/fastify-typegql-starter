module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
      diagnostics: false,
    },
  },
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
