import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react-native";
import { AppProvider } from "../../context";
import { useAuth } from "../../context/Auth/AuthContext";
import { SignIn } from "../../screens";

jest.mock("@invertase/react-native-apple-authentication", () => {
  return {
    appleAuth: {
      performRequest: jest.fn(),
      Scope: {
        FULL_NAME: 1,
        EMAIL: 0,
      },
      Operation: {
        LOGIN: 1,
      },
    },

    getCredentialStateForUser: jest.fn().mockReturnValue(1),
    State: {
      AUTHORIZED: 1,
    },
  };
});

describe("SignIn", () => {
  it("should render logo and button", async () => {
    const { getByTestId, getByText } = render(<SignIn />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      const logo = getByTestId("logo");
      const button = getByText(/Entrar com apple/i);
      expect(logo).toBeTruthy();
      expect(button).toBeTruthy();
    });
  });

  it("should call loginWithApple when button is pressed", async () => {
    const { getByText } = render(<SignIn />, {
      wrapper: AppProvider,
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AppProvider,
    });

    const button = getByText(/Entrar com apple/i);
    fireEvent.press(button);

    act(async () => {
      await result.current.loginWithApple();
    });
  });
});
