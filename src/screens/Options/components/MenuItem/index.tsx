import { Button, useTheme } from "native-base";
import React from "react";
import { MenuItemProps } from "./types";

export const MenuItem = ({ onPress, text, ...rest }: MenuItemProps) => {
  const { colors } = useTheme();
  return (
    <Button
      _icon={{
        style: {
          marginRight: 10,
        },
      }}
      _pressed={{ opacity: 0.5, bg: "transparent" }}
      borderBottomWidth={1}
      borderBottomColor={colors.grayBrand[300]}
      bg={"transparent"}
      justifyContent={"flex-start"}
      onPress={onPress}
      {...rest}
    >
      {text}
    </Button>
  );
};
