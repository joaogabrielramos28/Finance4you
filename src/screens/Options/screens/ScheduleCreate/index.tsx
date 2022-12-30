import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Text,
  VStack,
  useTheme,
  Button,
  HStack,
  IconButton,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";

export const ScheduleCreate = () => {
  const { colors } = useTheme();
  const [date, setDate] = useState(new Date());

  const { goBack } = useNavigation();

  const handleChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleCreateSchedule = () => {
    console.log(date);
  };
  return (
    <VStack
      flex={1}
      bg={"background"}
      safeAreaY
      padding={6}
      justifyContent={"space-between"}
    >
      <Box>
        <HStack alignItems={"center"} space={4}>
          <IconButton
            onPress={handleGoBack}
            icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
          />
          <Heading color={"grayBrand.200"}>Criar alerta</Heading>
        </HStack>
        <Text fontSize={"lg"} color={"grayBrand.300"} mt={4}>
          Nome do alerta
        </Text>
        <Input marginY={4} />
        <DateTimePicker
          accentColor={colors.violetBrand[400]}
          minimumDate={new Date()}
          themeVariant={"dark"}
          value={date}
          mode={"datetime"}
          locale={"pt-Br"}
          onChange={handleChangeDate}
        />
      </Box>
      <Button
        marginTop={6}
        bg={"violetBrand.700"}
        _text={{
          color: "grayBrand.200",
          bold: true,
        }}
        onPress={handleCreateSchedule}
      >
        Criar transação
      </Button>
    </VStack>
  );
};
