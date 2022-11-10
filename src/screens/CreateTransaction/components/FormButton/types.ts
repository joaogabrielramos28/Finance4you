import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

export interface IFormButton extends IButtonProps {
  variant?: "primary" | "secondary";
  selected: boolean;
  name: string;
  icon: any;
}
