import React from "react";
import { AppProvider } from "../../context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AppProvider>{children}</AppProvider>;
};
