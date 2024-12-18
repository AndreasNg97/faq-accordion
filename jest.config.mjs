export default {
  testEnvironment: "jsdom", // This is crucial for browser-related APIs like `document`
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
