import React from "react";
import { Checkbox as NativeBaseCheckbox, ICheckboxProps } from "native-base";

export const Checkbox = ({ children, ...rest }: ICheckboxProps) => {
  return (
    <NativeBaseCheckbox
      {...rest}
      _text={{
        color: "grayBrand.200",
      }}
      _checked={{
        bg: "violetBrand.400",
        borderColor: "transparent",
      }}
      _pressed={{
        bg: "transparent",
        opacity: 0.5,
      }}
    >
      {children}
    </NativeBaseCheckbox>
  );
};
