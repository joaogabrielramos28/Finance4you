import React from "react";
import { Button as ButtonNativeBase, IButtonProps } from "native-base";

export function Button({ variant, children, ...rest }: IButtonProps) {
  const typeVariant = variant === "outline" ? "transparent" : "violetBrand.700";
  const borderColor = variant === "outline" ? "violetBrand.700" : "transparent";
  const borderWidth = variant === "outline" ? 1 : 0;
  return (
    <ButtonNativeBase
      {...rest}
      bg={typeVariant}
      borderColor={borderColor}
      borderWidth={borderWidth}
      _text={{
        color: "grayBrand.200",
        bold: true,
      }}
      _pressed={{
        bg: typeVariant,
        opacity: 0.5,
      }}
    >
      {children}
    </ButtonNativeBase>
  );
}
