import React from "react";
import {
  Input as NativeBaseInput,
  IInputProps,
  VStack,
  Text,
} from "native-base";

type InputProps = IInputProps & {
  label: string;
};

export const Input = ({ label, ...rest }: InputProps) => {
  return (
    <VStack>
      <Text fontSize={"lg"} color={"grayBrand.300"} mt={4}>
        {label}
      </Text>
      <NativeBaseInput
        {...rest}
        _focus={{
          borderWidth: 1,
          borderColor: "violetBrand.700",
          bg: "transparent",
        }}
        color={"grayBrand.100"}
        marginY={2}
      />
    </VStack>
  );
};
