import { Header } from "@components/Header";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import React from "react";

export const RecurrentTransactionsCreate = () => {
  const { goBack } = useNavigation();
  return (
    <VStack flex={1} bg={"background"} safeAreaY>
      <Header onBack={goBack} title="Criar transação recorrente" />
    </VStack>
  );
};
