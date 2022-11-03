import { Box, Heading } from "native-base";
import React from "react";
import { CreditCard } from "../../components/CreditCard";
import { ButtonGroup } from "./components/ButtonGroup";
import { TransactionsList } from "./components/TransactionsList";

export const Transactions = () => {
  return (
    <Box bg={"background"} flex={1}>
      <Box
        w={"100%"}
        bg={"background"}
        shadow={8}
        safeAreaY
        alignItems={"center"}
      >
        <Heading color={"grayBrand.300"}>App</Heading>
      </Box>
      <Box
        alignItems={"center"}
        zIndex={-1}
        style={{
          transform: [{ translateY: -150 }],
        }}
      >
        <CreditCard type="blue" />
      </Box>

      <Box alignItems={"center"}>
        <ButtonGroup />
      </Box>

      <Box flex={1}>
        <TransactionsList />
      </Box>
    </Box>
  );
};
