import { IScrollViewProps } from "native-base";

export interface ILayout extends IScrollViewProps {
  hasScrollView?: boolean;
  children: React.ReactNode;
  hasScrollFab?: boolean;
}
