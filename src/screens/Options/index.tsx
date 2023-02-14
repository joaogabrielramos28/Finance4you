import React from "react";
import { Heading, useTheme, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import {
  BellRinging,
  Cardholder,
  ListDashes,
  SignOut,
  UserGear,
} from "phosphor-react-native";

import { useAuth } from "@context/Auth/AuthContext";
import { MenuItem } from "./components/MenuItem";

export const Options = () => {
  const { colors } = useTheme();
  const { signOut } = useAuth();

  const { navigate } = useNavigation();

  return (
    <VStack safeAreaY bg={"background"} flex padding={6}>
      <Heading color={colors.grayBrand[200]}>Opções</Heading>
      <VStack marginTop={4} space={4}>
        <MenuItem
          onPress={() => navigate("ScheduleCreate")}
          text={"Criar alerta"}
          leftIcon={<BellRinging size={24} color={colors.grayBrand[300]} />}
        />
        <MenuItem
          onPress={() => navigate("ScheduleList")}
          text={"Listagem de alertas"}
          leftIcon={<ListDashes size={24} color={colors.grayBrand[300]} />}
        />
        <MenuItem
          onPress={() => navigate("RecurrentTransactions")}
          text={"Transações recorrentes"}
          leftIcon={<Cardholder size={24} color={colors.grayBrand[300]} />}
        />
        <MenuItem
          onPress={() => navigate("AccountConfig")}
          text={"Configurações da conta"}
          leftIcon={<UserGear size={24} color={colors.grayBrand[300]} />}
        />
        <MenuItem
          onPress={signOut}
          text={"Sair da conta"}
          leftIcon={<SignOut size={24} color={colors.grayBrand[300]} />}
        />
      </VStack>
    </VStack>
  );
};
