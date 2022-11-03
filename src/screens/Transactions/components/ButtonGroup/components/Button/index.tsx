import { Box, Button as NativeBaseButton, Text, VStack } from "native-base";
import React from "react";
import { IButton } from "./types";

export const Button = ({
  variant = "primary",
  children,
  subtitle,
}: IButton) => {
  const size = variant == "primary" ? "52px" : "48px";
  return (
    <VStack alignItems={"center"} space={"8px"}>
      <NativeBaseButton
        width={size}
        height={size}
        borderRadius={"4px"}
        bg={"violetBrand.700"}
      >
        {children}
      </NativeBaseButton>
      <Text fontSize={"md"} color={"grayBrand.400"}>
        {subtitle}
      </Text>
    </VStack>
  );
};
