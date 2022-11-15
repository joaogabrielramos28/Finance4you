import { Box, Heading } from "native-base";
import React from "react";
import { CreditCard } from "../../components/CreditCard";
import { ButtonGroup } from "./components/ButtonGroup";
import { TransactionsList } from "./components/TransactionsList";

export const Transactions = () => {
  return (
    <Box bg={"background"} flex={1} safeAreaY>
      <Box
        alignItems={"center"}
        zIndex={-1}
        style={{
          transform: [{ translateY: -150 }],
        }}
      >
        <CreditCard />
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
