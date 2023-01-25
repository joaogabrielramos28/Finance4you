import {
  Avatar,
  Box,
  FlatList,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Minus } from "phosphor-react-native";
import React from "react";
import { useAuth } from "../../../../../../context/Auth/AuthContext";
import { AvatarImage } from "../../../../../../utils/AvatarImage";
import { ActiveListProps } from "./types";

export const ActiveList = ({ data, onDisable }: ActiveListProps) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  return (
    <Box mt={8}>
      <Text fontSize={"md"} color="grayBrand[300]">
        Usuários ativos
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
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
        }
        renderItem={({ item }) => (
          <HStack
            borderBottomWidth={2}
            borderColor="grayBrand.500"
            key={item.id}
            alignItems={"center"}
            p={2}
            justifyContent="space-between"
          >
            <HStack space={4} alignItems="center">
              <Avatar
                size={"sm"}
                color={colors.grayBrand[200]}
                source={{
                  uri: AvatarImage(item.name),
                }}
              />
              <VStack>
                <Text fontSize={"lg"} color={"grayBrand.300"}>
                  {item.name}
                </Text>
                <Text fontSize={"sm"} color={"grayBrand.400"}>
                  {item.type === "shared" ? "Compartilhado" : "Principal"}
                </Text>
              </VStack>
            </HStack>

            <IconButton
              onPress={() => onDisable(item.id)}
              icon={
                <Minus
                  size={20}
                  color={colors.violetBrand[600]}
                  weight={"bold"}
                />
              }
            />
          </HStack>
        )}
      />
    </Box>
  );
};
