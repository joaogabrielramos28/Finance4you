import React from "react";
import { Box, Heading, HStack, Text, useTheme, VStack } from "native-base";
import { GraduationCap } from "phosphor-react-native";

import { ITransaction } from "../../context/types";
import { categories } from "../../data/category";

export const Transaction = ({
  amount,
  category,
  dateFormatted,
  subCategory,
  type,
}: ITransaction) => {
  const selectedCategory = categories.find((item) => item.name === category);
  const Icon = selectedCategory.icon;

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
            <Icon color={colors.grayBrand[300]} weight="fill" size={20} />
          </Box>
          <VStack>
            <Heading
              color={"grayBrand.300"}
              fontSize={"lg"}
              fontWeight={"normal"}
            >
              {category}
            </Heading>
            <Text color={"grayBrand.400"} fontSize={"xs"}>
              {subCategory}
            </Text>
          </VStack>
        </HStack>

        <Text fontSize={"xs"} color={"grayBrand.300"}>
          {dateFormatted}
        </Text>

        <Text color={type === "income" ? "greenBrand.500" : "redBrand.500"}>
          {amount}
        </Text>
      </HStack>
    </Box>
  );
};
