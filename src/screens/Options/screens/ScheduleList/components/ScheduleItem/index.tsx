import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Box, HStack, Skeleton, Text, VStack } from "native-base";
import { Calendar, Clock } from "phosphor-react-native";
import React from "react";
import { INotification } from "../../../types";

export const ScheduleItem = ({ body, date, category, id }: INotification) => {
  const dateFormatted = date
    ? format(new Date(date), "dd/MM/yyyy", {
        locale: ptBR,
      })
    : null;

  const timeFormatted = date
    ? format(new Date(date), "HH:mm", {
        locale: ptBR,
      })
    : null;

  return (
    <VStack bg={"grayBrand.400"} borderRadius={16} p={4} width={"100%"} mt={4}>
      <HStack space={4} alignItems={"center"}>
        <Box
          width={2}
          bgColor={"violetBrand.700"}
          height={"100%"}
          borderRadius={4}
        />

        <Box flex={1}>
          <Text>{category}</Text>

          <HStack justifyContent={"space-between"} mt={2}>
            <HStack alignItems={"center"} space={2}>
              <Calendar size={24} />
              <Text>{date ? dateFormatted : null}</Text>
            </HStack>

            <HStack alignItems={"center"} space={2}>
              <Clock size={24} />
              <Text>{date ? timeFormatted : null}</Text>
            </HStack>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  );
};
