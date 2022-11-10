import { Box, Button, HStack, Text, useTheme } from "native-base";
import { Gradient, GraduationCap } from "phosphor-react-native";
import React from "react";
import { IFormButton } from "./types";

export const FormButton = ({
  variant = "primary",
  selected,
  name,
  icon: Icon,
  ...rest
}: IFormButton) => {
  const { colors } = useTheme();
  const background = variant === "primary" ? "zinc.800" : "zinc.700";
  return (
    <Button
      {...rest}
      width={"100%"}
      bg={background}
      justifyContent={"flex-start"}
      padding={"16px"}
      borderWidth={selected ? 1 : 0}
      borderColor={colors.violetBrand[700]}
    >
      <HStack alignItems={"center"} space={4}>
        <Icon weight="bold" color={colors.grayBrand[200]} />
        <Text color={"grayBrand.300"} fontWeight={"bold"}>
          {name}
        </Text>
      </HStack>
    </Button>
  );
};
