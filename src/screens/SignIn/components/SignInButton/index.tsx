import { Button, useTheme } from "native-base";
import React from "react";
import { ISignInButtonProps } from "./types";
import { AppleLogo, GoogleLogo } from "phosphor-react-native";

export const SignInButton = ({ title, type, ...rest }: ISignInButtonProps) => {
  const theme = useTheme();
  const props = {
    color: theme.colors.grayBrand[300],
    size: 24,
  };
  const icon =
    type === "apple" ? <AppleLogo {...props} /> : <GoogleLogo {...props} />;
  return (
    <Button
      {...rest}
      background={"zinc.900"}
      padding={"12px"}
      leftIcon={icon}
      _text={{
        marginLeft: "2",
        fontSize: "md",
      }}
    >
      {title}
    </Button>
  );
};
