import React from "react";
import {
  Avatar,
  FlatList,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Box } from "native-base";
import { Plus } from "phosphor-react-native";

import { DisableListProps } from "./types";

export const DisableList = ({ data, onActivate }: DisableListProps) => {
  const { colors } = useTheme();
  return (
    <Box mt={8}>
      <Text fontSize={"md"} color="grayBrand[300]">
        Usuários desativados
      </Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
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
                  uri: `https://ui-avatars.com/api/?name=${item.name}&length=1`,
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
              onPress={() => onActivate(item.id)}
              icon={
                <Plus
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
