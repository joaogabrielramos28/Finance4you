import React from "react";
import { AppProvider } from "./src/context";
import { Routes } from "./src/routes/index.routes";

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
