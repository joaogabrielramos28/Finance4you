import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { Box, Text, Factory, Image } from "native-base";
import { Dimensions } from "react-native";

import Brand from "../../assets/brand.png";
import { useTransactions } from "../../context/TransactionsContext";

const width = Dimensions.get("window").width - 20;
const height = 200;

export const CreditCard = () => {
  const { creditCardStyle } = useTransactions();
  const FactoryLinearGradient = Factory(LinearGradient);
  const colors =
    creditCardStyle === "blue"
      ? ["#2290B3", "#7E22CE"]
      : creditCardStyle === "purple"
      ? ["#8404F3", "#7E22CE"]
      : ["#F30469", "#7E22CE"];

  return (
    <Box safeAreaY>
      <FactoryLinearGradient
        colors={colors}
        width={width}
        height={height}
        borderRadius={"8px"}
        padding={"32px"}
        style={{ transform: [{ rotate: "90deg" }] }}
        alignItems={"center"}
      >
        <Box
          width={"100%"}
          alignItems={"flex-end"}
          justifyContent={"space-between"}
        >
          <Text
            color={"grayBrand.200"}
            fontSize={"lg"}
            fontWeight={"bold"}
            style={{ transform: [{ rotate: "-90deg" }] }}
          >
            Debit
          </Text>
        </Box>

        <Box
          w={"100%"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text fontSize={"lg"} fontWeight={"bold"} color={"grayBrand.100"}>
            5554 1234 4432 0092
          </Text>
        </Box>

        <Box w={"100%"} alignItems={"flex-end"}>
          <Image source={Brand} alt={"Credit Card"} />
        </Box>
      </FactoryLinearGradient>
    </Box>
  );
};
