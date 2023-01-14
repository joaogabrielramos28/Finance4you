import {
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react-native";
import { AppProvider } from "../../context";
import { useAuth } from "../../context/Auth/AuthContext";
import { SignIn } from "../../screens";

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

    const loginWithApple = jest.fn();
    result.current.loginWithApple = loginWithApple;

    await waitFor(() => {
      const button = getByText(/Entrar com apple/i);
      fireEvent.press(button);
      expect(loginWithApple).toHaveBeenCalled();
    });
  });
});
