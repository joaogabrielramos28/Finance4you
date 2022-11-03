import { ReactNode } from "react";

export interface IButton {
  variant?: "primary" | "secondary";
  children: ReactNode;
  subtitle: string;
}
