import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("@invertase/react-native-apple-authentication", () => {
  return {
    AppleAuthentication: {
      appleAuth: jest.fn(),
    },
  };
});
