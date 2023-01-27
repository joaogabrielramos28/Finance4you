import React from "react";
import { Factory } from "native-base";
import MaskInputLib, { MaskInputProps } from "react-native-mask-input";

const MaskInputFactory = Factory(MaskInputLib);

export const MaskInput = ({
  value,
  onChangeText,
  mask,
  ...rest
}: MaskInputProps) => {
  return (
    <MaskInputFactory
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      mask={mask}
      color={"grayBrand.200"}
      focusable
      borderWidth={1}
      padding={"12px"}
      borderColor={"grayBrand.300"}
      borderRadius={"8px"}
      placeholder={"Digite o valor"}
      placeholderTextColor={"#e5e7eb"}
    />
  );
};
