import { useNavigation } from "@react-navigation/native";
import { Box, Button, Heading, useTheme, VStack } from "native-base";
import { BellRinging, ListDashes } from "phosphor-react-native";
import React from "react";
import { useAuth } from "../../context/Auth/AuthContext";
import { MenuItem } from "./components/MenuItem";

export const Options = () => {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  const { navigate } = useNavigation();

  const handleGoToScheduleCreate = () => {
    navigate("ScheduleCreate");
  };

  const handleGoToScheduleList = () => {
    navigate("ScheduleList");
  };
  return (
    <VStack safeAreaY bg={"background"} flex padding={6}>
      <Heading color={colors.grayBrand[200]}>Opções</Heading>
      <VStack marginTop={4} space={4}>
        <MenuItem
          onPress={handleGoToScheduleCreate}
          text={"Criar alerta"}
          leftIcon={<BellRinging size={24} color={colors.grayBrand[300]} />}
        />
        <MenuItem
          onPress={handleGoToScheduleList}
          text={"Listagem de alertas"}
          leftIcon={<ListDashes size={24} color={colors.grayBrand[300]} />}
        />
        <MenuItem
          onPress={signOut}
          text={"Sair da conta"}
          leftIcon={<ListDashes size={24} color={colors.grayBrand[300]} />}
        />
      </VStack>
    </VStack>
  );
};
