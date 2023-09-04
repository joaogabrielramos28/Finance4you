import { IButtonProps } from "native-base";

export interface MenuItemProps extends IButtonProps {
  text: string;
  onPress: () => void;
}
