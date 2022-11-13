import { useNavigation } from "@react-navigation/native";
import { HStack, useTheme } from "native-base";
import { CreditCard, MagicWand, Plus } from "phosphor-react-native";
import React, { useState } from "react";
import { ModalCardConfig } from "../ModalCardConfig";
import { Button } from "./components/Button";

export const ButtonGroup = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [modalChangeCardIsOpen, setModalChangeCardIsOpen] = useState(false);

  const toggleModalChangeCard = () => {
    setModalChangeCardIsOpen(!modalChangeCardIsOpen);
  };

  const handleGoToCreateTransaction = () => {
    navigate("CreateTransaction");
  };
  return (
    <>
      <ModalCardConfig
        onClose={toggleModalChangeCard}
        isOpen={modalChangeCardIsOpen}
      />
      <HStack space={"32px"}>
        <Button
          onPress={toggleModalChangeCard}
          subtitle="Trocar"
          variant="secondary"
          children={
            <CreditCard
              size={26}
              weight={"bold"}
              color={colors.grayBrand[200]}
            />
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
            <MagicWand
              size={26}
              weight={"bold"}
              color={colors.grayBrand[200]}
            />
          }
        />
      </HStack>
    </>
  );
};
