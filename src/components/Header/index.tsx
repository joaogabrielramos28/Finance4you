import { Heading, HStack, IconButton, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import { HeaderProps } from "./types";

export function Header({ title, onBack }: HeaderProps) {
  const { colors } = useTheme();
  return (
    <HStack alignItems={"center"} space={4}>
      <IconButton
        onPress={onBack}
        icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
      />
      <Heading color={"grayBrand.200"}>{title}</Heading>
    </HStack>
  );
}
