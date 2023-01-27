import React, { useState } from "react";
import {
  Box,
  Heading,
  HStack,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";

import Swipeable from "react-native-gesture-handler/Swipeable";

import { ITransaction } from "@context/Transactions/types";
import { categories } from "@data/category";
import { useNavigation } from "@react-navigation/native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Trash } from "phosphor-react-native";
import { View } from "react-native";
import { useTransactions } from "@context/Transactions/TransactionsContext";
import { ConfirmModal } from "@components/ConfirmModal";

export const Transaction = ({
  id,
  amount,
  category,
  dateFormatted,
  subCategory,
  type,
  description,
  responsible,
}: ITransaction) => {
  const [confirmationIsVisible, setConfirmationIsVisible] = useState(false);

  const selectedCategory = categories.find((item) => item.name === category);
  const Icon = selectedCategory?.icon;
  const { navigate } = useNavigation();
  const { deleteTransaction } = useTransactions();

  const { colors } = useTheme();

  const handleGoToTransactionDetails = () => {
    navigate("TransactionDetails", {
      id,
      amount,
      category,
      date: dateFormatted,
      subCategory,
      description,
      type,
      responsible,
    });
  };

  const handleToggleConfirmationModal = () => {
    setConfirmationIsVisible((prevState) => !prevState);
  };

  const handleDeleteTransaction = () => {
    deleteTransaction(id);
  };

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <View
          style={{
            padding: 12,
            justifyContent: "center",
            backgroundColor: colors.violetBrand[700],

            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <Box>
            <BorderlessButton onPress={handleToggleConfirmationModal}>
              <Trash size={24} weight="fill" color={colors.grayBrand[200]} />
            </BorderlessButton>
          </Box>
        </View>
      )}
    >
      <Pressable alignItems={"center"} onPress={handleGoToTransactionDetails}>
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
      </Pressable>
      <ConfirmModal
        isVisible={confirmationIsVisible}
        onDismiss={handleToggleConfirmationModal}
        onSuccessful={handleDeleteTransaction}
      />
    </Swipeable>
  );
};
