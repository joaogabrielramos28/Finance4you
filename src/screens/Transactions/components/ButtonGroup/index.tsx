import { useNavigation } from "@react-navigation/native";
import { HStack, useTheme } from "native-base";
import { CreditCard, MagicWand, Plus } from "phosphor-react-native";
import React from "react";
import { Button } from "./components/Button";

export const ButtonGroup = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const handleGoToCreateTransaction = () => {
    navigate("CreateTransaction");
  };
  return (
    <HStack space={"32px"}>
      <Button
        subtitle="Trocar"
        variant="secondary"
        children={
          <CreditCard size={26} weight={"bold"} color={colors.grayBrand[200]} />
        }
      />
      <Button
        onPress={handleGoToCreateTransaction}
        subtitle="Adicionar"
        children={
          <Plus size={26} weight={"bold"} color={colors.grayBrand[200]} />
        }
      />
      <Button
        subtitle="Pensar"
        variant="secondary"
        children={
          <MagicWand size={26} weight={"bold"} color={colors.grayBrand[200]} />
        }
      />
    </HStack>
  );
};
