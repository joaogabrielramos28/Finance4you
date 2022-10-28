import { extendTheme } from "native-base";

const defaultTheme = {
  colors: {
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
    },
    zinc: {
      500: "#18181b",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
    },
    red: {
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    green: {
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    violet: {
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
  },

  fonts: {
    heading: {
      lg: "2rem",
      md: "1.375rem",
      sm: "1.25rem",
    },
    text: {
      xl: "1.125rem",
      lg: "1rem",
      md: "0.875rem",
      sm: "0.75rem",
    },
  },
} as const;

export const theme = extendTheme({
  colors: defaultTheme.colors,
  fontSizes: defaultTheme.fonts,
});
