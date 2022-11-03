import { Box, Button, HStack, Text, useTheme } from "native-base";
import { Gradient, GraduationCap } from "phosphor-react-native";
import React from "react";
import { IFormButton } from "./types";

export const FormButton = ({ variant = "primary" }: IFormButton) => {
  const { colors } = useTheme();
  const background = variant === "primary" ? "zinc.800" : "zinc.700";
  return (
    <Button
      width={"100%"}
      bg={background}
      justifyContent={"flex-start"}
      padding={"16px"}
    >
      <HStack alignItems={"center"} space={4}>
        <GraduationCap weight="bold" color={colors.grayBrand[200]} />
        <Text color={"grayBrand.300"} fontWeight={"bold"}>
          Educação
        </Text>
      </HStack>
    </Button>
  );
};
