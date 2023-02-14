import React from "react";
import { Box, HStack, Text, VStack } from "native-base";
import { House, Money } from "phosphor-react-native";
import Animated, { FadeOut, Layout } from "react-native-reanimated";
import { ITransaction } from "@context/Transactions/types";
import { categories } from "@data/category";

export const Item = ({ category, amount, subCategory }: ITransaction) => {
  const selectedCategory =
    categories.find((item) => item.name === category) ?? categories[0];
  const content = (
    <HStack space={4} alignItems={"center"}>
      <Box
        width={2}
        bgColor={"violetBrand.700"}
        height={"100%"}
        borderRadius={4}
      />

      <Box flex={1}>
        <Text>{subCategory}</Text>

        <HStack justifyContent={"space-between"} mt={2}>
          <HStack alignItems={"center"} space={2}>
            <Money size={24} />
            <Text>{amount}</Text>
          </HStack>

          <HStack alignItems={"center"} space={2}>
            <selectedCategory.icon />

            <Text>{category}</Text>
          </HStack>
        </HStack>
      </Box>
    </HStack>
  );

  return (
    <VStack bg={"grayBrand.400"} borderRadius={16} p={4} width={"100%"} mt={4}>
      <Animated.View layout={Layout} exiting={FadeOut}>
        {content}
      </Animated.View>
    </VStack>
  );
};
