import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Box, HStack, IconButton, Text, useTheme } from "native-base";
import { CaretLeft, CaretRight } from "phosphor-react-native";
import React, { useState } from "react";
import { useCreateTransaction } from "../../../../context/CreateTransactionContext";

export const MonthSelect = () => {
  const { handleChangePeriod, actualPeriod } = useCreateTransaction();
  const { colors } = useTheme();

  return (
    <HStack alignItems={"center"} space={4}>
      <IconButton
        onPress={() => handleChangePeriod("prev")}
        icon={<CaretLeft size={20} color={colors.grayBrand[200]} />}
      />
      <Text color={"grayBrand.300"} fontSize={"xl"}>
        {format(actualPeriod, "MMMM/yyyy", { locale: ptBR })}
      </Text>
      <IconButton
        isDisabled={
          actualPeriod.getMonth() === new Date().getMonth() &&
          actualPeriod.getFullYear() === new Date().getFullYear()
        }
        onPress={() => handleChangePeriod("next")}
        icon={<CaretRight size={20} color={colors.grayBrand[200]} />}
      />
    </HStack>
  );
};
