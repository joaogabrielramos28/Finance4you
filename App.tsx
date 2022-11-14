import React from "react";
import { AppProvider } from "./src/context";
import { useAuth } from "./src/context/Auth/AuthContext";
import { Routes } from "./src/routes/index.routes";
import { SignIn } from "./src/screens";

export default function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}
