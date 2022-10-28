import { Box, Heading, Text, useTheme, VStack } from "native-base";
import React, { useState } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export const CircularChart = () => {
  const { colors } = useTheme();
  return (
    <Box position={"relative"}>
      <AnimatedCircularProgress
        size={220}
        width={15}
        backgroundWidth={5}
        fill={10}
        tintColor={colors.violetBrand[400]}
        tintColorSecondary={colors.violetBrand[700]}
        backgroundColor="#3d5875"
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
        children={() => (
          <VStack alignItems={"center"} marginBottom={6}>
            <Heading color={"grayBrand.300"}>R$ 1500,00</Heading>
            <Text color={"grayBrand.400"}>gastos de R$ 6500,00</Text>
          </VStack>
        )}
      />
    </Box>
  );
};
