import { useNavigation } from "@react-navigation/native";
import { Box, Heading, HStack, IconButton, useTheme } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";

export const ScheduleList = () => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  return (
    <Box flex bg="background" safeAreaY>
      <HStack alignItems={"center"} space={4}>
        <IconButton
          onPress={goBack}
          icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
        />
        <Heading color={"grayBrand.200"}>Alertas criados</Heading>
      </HStack>
    </Box>
  );
};
