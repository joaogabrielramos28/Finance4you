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
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export const ScheduleCreate = () => {
  const { colors } = useTheme();
  const [schedule, setSchedule] = useState<{
    name: string;
    date: Date;
  }>({
    name: "",
    date: new Date(),
  });

  const { goBack } = useNavigation();

  const handleChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || schedule.date;
    setSchedule({ ...schedule, date: currentDate });
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleCreateSchedule = () => {
    try {
      PushNotificationIOS.addNotificationRequest({
        id: String(new Date().getTime()),
        badge: 1,
        body: `Ei não esqueça de pagar ${schedule.name}`,
        category: schedule.name,
        fireDate: schedule.date,
        repeats: true,
        repeatsComponent: {
          hour: true,
          day: true,
          minute: true,
          dayOfWeek: false,
          month: false,
          second: false,
          year: false,
        },
        title: "Lembrete de pagamento",
      });
      console.log("com sucesso");
    } catch (error) {
      console.log(error);
    }
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
        <Input
          padding={4}
          _focus={{
            borderWidth: 1,
            borderColor: "violetBrand.700",
            bg: "transparent",
          }}
          color={colors.grayBrand[300]}
          marginY={4}
          value={schedule.name}
          placeholder={"Conta de luz"}
          onChangeText={(text) => setSchedule({ ...schedule, name: text })}
        />
        <DateTimePicker
          accentColor={colors.violetBrand[400]}
          themeVariant={"dark"}
          value={schedule.date}
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
