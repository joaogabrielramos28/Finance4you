import React from "react";
import { Select as NativeBaseSelect, useTheme, Box } from "native-base";
import { SelectProps } from "./types";
import { CaretDown } from "phosphor-react-native";

export function Select({ children, ...rest }: SelectProps) {
  const { colors } = useTheme();
  return (
    <NativeBaseSelect
      {...rest}
      _item={{
        backgroundColor: "background",
        _text: { color: "grayBrand.200" },
      }}
      color={"grayBrand.200"}
      _actionSheetContent={{
        backgroundColor: "background",
      }}
      _actionSheetBody={{
        backgroundColor: "background",
      }}
      dropdownIcon={
        <Box marginRight={2}>
          <CaretDown size={20} color={colors.grayBrand[400]} />
        </Box>
      }
    >
      {children}
    </NativeBaseSelect>
  );
}
