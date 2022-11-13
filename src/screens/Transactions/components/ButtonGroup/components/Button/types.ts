import { IButtonProps } from "native-base";
import { ReactNode } from "react";

export interface IButton extends IButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  subtitle: string;
}
