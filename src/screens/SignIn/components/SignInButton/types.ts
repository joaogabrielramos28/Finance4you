import { IButtonProps } from "native-base";
import { ReactNode } from "react";

export interface ISignInButtonProps extends IButtonProps {
  title: string;
  type: "apple" | "google";
}
