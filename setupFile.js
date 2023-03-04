import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@invertase/react-native-apple-authentication", () => {
  return {
    AppleAuthentication: {
      appleAuth: jest.fn(),
    },
  };
});

jest.mock("@react-native-firebase/auth", () => {
  return {
    auth: {
      signInWithCredential: jest.fn(),
    },
  };
});

global.__reanimatedWorkletInit = () => {};
jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock")
);
