import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Home } from "../../screens";
import { AppProvider } from "../../context/";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

jest.mock("@invertase/react-native-apple-authentication", () => {
  return {
    AppleAuthentication: {
      appleAuth: jest.fn(),
    },
  };
});

const currentMonth = format(new Date(), "MMMM/yyyy", { locale: ptBR });
const prevMonth = format(subMonths(new Date(), 1), "MMMM/yyyy", {
  locale: ptBR,
});

describe("Home Screen", () => {
  it("Should be render the home title", async () => {
    const { getByText } = render(<Home />, {
      wrapper: AppProvider,
    });
    await waitFor(() => {
      expect(getByText("Resumo de gastos")).toBeTruthy();
    });
  });
  it("should render the current month and year by default", async () => {
    const { getByText } = render(<Home />, {
      wrapper: AppProvider,
    });
    await waitFor(() => {
      expect(getByText(currentMonth)).toBeTruthy();
    });
  });

  it("should can back to the prev month", async () => {
    const { getByTestId, getByText } = render(<Home />, {
      wrapper: AppProvider,
    });

    const prevMonthButton = getByTestId("prev-month-button");
    fireEvent.press(prevMonthButton);

    await waitFor(() => {
      expect(getByText(prevMonth)).toBeTruthy();
    });
  });
  it("Shouldn't be able to go to the next month when selected month is current", async () => {
    const { getByTestId } = render(<Home />, {
      wrapper: AppProvider,
    });

    const nextMonthButton = getByTestId("next-month-button");

    await waitFor(() => {
      expect(nextMonthButton.props.accessibilityState["disabled"]).toEqual(
        true
      );
    });
  });
  it("should show message if don't have transactions", async () => {
    const { getByText } = render(<Home />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      expect(getByText("Nenhuma movimentação")).toBeTruthy();
    });
  });
  it("should render graph ", async () => {
    const { getByText } = render(<Home />, {
      wrapper: AppProvider,
    });

    await waitFor(() => {
      expect(getByText(/gastos de/i)).toBeTruthy();
    });
  });
});
