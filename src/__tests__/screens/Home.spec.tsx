import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { renderHook } from "@testing-library/react-hooks";
import { Home } from "../../screens";
import { getMonthsName } from "../../utils/formatMonth";
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
  it("should render the current month and year by default", () => {
    const { getByText } = render(<Home />, {
      wrapper: AppProvider,
    });

    expect(getByText(currentMonth)).toBeTruthy();
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
  // it("Shouldn`t can ");
});
