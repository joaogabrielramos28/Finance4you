import { theme } from "../styles/theme/defaultTheme";

type CustomThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
