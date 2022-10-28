import React from "react";
import { Box, Heading, HStack, Text, useTheme, VStack } from "native-base";
import { GraduationCap } from "phosphor-react-native";
import { ITransactionProps } from "./types";

export const Transaction = ({ type }: ITransactionProps) => {
  const { colors } = useTheme();
  return (
    <Box alignItems={"center"}>
      <HStack
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <HStack space={2}>
          <Box
            width={"34px"}
            height={"34px"}
            bg={"violetBrand.700"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={4}
          >
            <GraduationCap
              color={colors.grayBrand[300]}
              weight="fill"
              size={20}
            />
          </Box>
          <VStack>
            <Heading
              color={"grayBrand.300"}
              fontSize={"lg"}
              fontWeight={"normal"}
            >
              Educação
            </Heading>
            <Text color={"grayBrand.400"} fontSize={"xs"}>
              Faculdade
            </Text>
          </VStack>
        </HStack>

        <Text fontSize={"xs"} color={"grayBrand.300"}>
          07/10/22
        </Text>

        <Text color={type === "Enter" ? "greenBrand.500" : "redBrand.500"}>
          R$600,00
        </Text>
      </HStack>
    </Box>
  );
};
