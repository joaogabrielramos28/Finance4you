import React, { useState } from "react";
import { Factory, Heading, Text, VStack } from "native-base";
import MaskInputLib, { MaskInputProps } from "react-native-mask-input";

const MaskInputFactory = Factory(MaskInputLib);

type IMaskInputProps = MaskInputProps & {
  label: string;
  bold?: boolean;
};

export const MaskInput = ({
  value,
  onChangeText,
  mask,
  label,
  bold = false,
}: IMaskInputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <VStack>
      <Text fontSize={"lg"} color={"grayBrand.300"} mt={4} bold={bold}>
        {label}
      </Text>

      <MaskInputFactory
        onFocus={() => setFocus(true)}
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
        mask={mask}
        color={"grayBrand.100"}
        focusable
        borderWidth={1}
        padding={"12px"}
        borderColor={!focus ? "grayBrand.300" : "violet.700"}
        borderRadius={"8px"}
        placeholder={"Digite o valor"}
        placeholderTextColor={"#9ca3af"}
        marginY={2}
      />
    </VStack>
  );
};
