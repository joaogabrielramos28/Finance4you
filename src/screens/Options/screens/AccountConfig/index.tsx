import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Input,
  Switch,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft, Minus, Plus } from "phosphor-react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/Auth/AuthContext";
import {
  deleteItemFromAsyncStorage,
  getItemFromAsyncStorage,
  setItemToAsyncStorage,
  setItemWhenDataIsBoolean,
} from "../../../../helpers/AsyncStorage";
import { AsyncStorageKeys } from "../../../../helpers/types";
import { SharedUserList } from "./types";

export const AccountConfig = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const { user } = useAuth();
  const [hasAccountShared, setHasAccountShared] = useState(false);
  const [sharedUserNameList, setSharedUserNameList] = useState<
    SharedUserList[]
  >([]);
  const [sharedUserName, setSharedUserName] = useState<string>("");

  useEffect(() => {
    const loadAccountShared = async () => {
      const response = await getItemFromAsyncStorage(
        AsyncStorageKeys.ACCOUNT_SHARED
      );

      setHasAccountShared(response);
    };
    loadAccountShared();
  }, []);

  useEffect(() => {
    const loadSharedUserNameList = async () => {
      const response = await getItemFromAsyncStorage(
        AsyncStorageKeys.SHARED_USER_LIST
      );

      setSharedUserNameList(response);
    };

    loadSharedUserNameList();
  }, []);

  const handleGoBack = () => {
    goBack();
  };

  const handleChangeAccountShared = (value: boolean) => {
    setHasAccountShared(value);
    setItemWhenDataIsBoolean(AsyncStorageKeys.ACCOUNT_SHARED, value);
  };

  const handleAddSharedUser = () => {
    const newUser: SharedUserList = {
      id: String(new Date().getTime()),
      name: sharedUserName,
      type: "shared",
    };

    setSharedUserNameList([...sharedUserNameList, newUser]);
    setItemToAsyncStorage(AsyncStorageKeys.SHARED_USER_LIST, newUser);
    setSharedUserName("");
  };

  const handleChangeSharedUserName = (value: string) => {
    setSharedUserName(value);
  };

  const handleRemoveSharedUser = (id: string) => {
    const newList = sharedUserNameList.filter((item) => item.id !== id);

    setSharedUserNameList(newList);
    deleteItemFromAsyncStorage(AsyncStorageKeys.SHARED_USER_LIST, newList);
  };
  return (
    <VStack flex={1} bg={"background"} safeAreaY padding={6}>
      <HStack alignItems={"center"} space={4}>
        <IconButton
          onPress={handleGoBack}
          icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
        />
        <Heading color={"grayBrand.200"}>Configurações da conta</Heading>
      </HStack>

      <HStack alignItems={"center"} justifyContent="space-between" mt={8}>
        <Text fontSize={"lg"} color={"grayBrand.300"}>
          Ativar conta conjunto
        </Text>
        <Switch
          colorScheme={"violetBrand"}
          size="sm"
          value={hasAccountShared}
          onValueChange={handleChangeAccountShared}
        />
      </HStack>
      {hasAccountShared ? (
        <VStack mt={8}>
          <Text fontSize={"lg"} color={"grayBrand.300"}>
            Adicionar usuário
          </Text>

          <HStack alignItems={"center"} space={2} mt={2}>
            <Input
              _focus={{
                borderColor: "violetBrand.700",
                backgroundColor: "transparent",
              }}
              value={sharedUserName}
              onChangeText={handleChangeSharedUserName}
              maxWidth={"300px"}
              width={"100%"}
              padding={3}
              borderRadius={"8px"}
              color={"grayBrand.100"}
            />
            <Button
              isDisabled={sharedUserName.length === 0}
              width={"48px"}
              bgColor={"violetBrand.700"}
              startIcon={<Plus size={20} color={colors.grayBrand[200]} />}
              onPress={handleAddSharedUser}
            />
          </HStack>

          <HStack
            mt={8}
            borderBottomWidth={2}
            borderColor="grayBrand.500"
            alignItems={"center"}
            p={2}
            justifyContent="space-between"
          >
            <HStack space={4} alignItems="center">
              <Avatar
                size={"sm"}
                color={colors.grayBrand[200]}
                source={{
                  uri: user.photo,
                }}
              />
              <VStack>
                <Text fontSize={"lg"} color={"grayBrand.300"}>
                  {user.name}
                </Text>
                <Text fontSize={"sm"} color={"grayBrand.400"}>
                  Principal
                </Text>
              </VStack>
            </HStack>
          </HStack>

          <Box mt={8}>
            {sharedUserNameList.map((sharedUser) => (
              <HStack
                borderBottomWidth={2}
                borderColor="grayBrand.500"
                key={sharedUser.id}
                alignItems={"center"}
                p={2}
                justifyContent="space-between"
              >
                <HStack space={4} alignItems="center">
                  <Avatar
                    size={"sm"}
                    color={colors.grayBrand[200]}
                    source={{
                      uri: `https://ui-avatars.com/api/?name=${sharedUser.name}&length=1`,
                    }}
                  />
                  <VStack>
                    <Text fontSize={"lg"} color={"grayBrand.300"}>
                      {sharedUser.name}
                    </Text>
                    <Text fontSize={"sm"} color={"grayBrand.400"}>
                      {sharedUser.type === "shared"
                        ? "Compartilhado"
                        : "Principal"}
                    </Text>
                  </VStack>
                </HStack>

                <IconButton
                  onPress={() => handleRemoveSharedUser(sharedUser.id)}
                  icon={
                    <Minus
                      size={20}
                      color={colors.violetBrand[600]}
                      weight={"bold"}
                    />
                  }
                />
              </HStack>
            ))}
          </Box>
        </VStack>
      ) : null}
    </VStack>
  );
};
