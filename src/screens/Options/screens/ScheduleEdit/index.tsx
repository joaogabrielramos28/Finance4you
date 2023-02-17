import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { Layout } from "@components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Text, useTheme, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { IScheduleEditScreenProps } from "src/@types/navigation";
import DateTimePicker from "@react-native-community/datetimepicker";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Button } from "@components/Button";

export const ScheduleEdit = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { colors } = useTheme();

  const { schedule } = params as IScheduleEditScreenProps;

  const bodyWord = schedule.body.replace("Ei não esqueça de pagar ", "");

  const [newName, setNewName] = useState(bodyWord);
  const [newDate, setNewDate] = useState(new Date(schedule.date));

  const handleChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setNewDate(currentDate);
  };

  const handleEdit = () => {
    const newSchedule = {
      id: String(new Date().getTime()),
      badge: 1,
      body: `Ei não esqueça de pagar ${newName}`,
      category: newName,
      fireDate: newDate,
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
    };

    PushNotificationIOS.removePendingNotificationRequests([schedule.id]);
    PushNotificationIOS.addNotificationRequest(newSchedule);

    goBack();
  };

  return (
    <Layout>
      <Header onBack={goBack} title="Editar alerta" />

      <VStack p={6}>
        <Input
          label="Nome do alerta"
          value={newName}
          onChangeText={setNewName}
        />

        <Text fontSize={"lg"} color={"grayBrand.300"} mt={4}>
          Data
        </Text>

        <DateTimePicker
          accentColor={colors.violetBrand[400]}
          themeVariant={"dark"}
          value={newDate}
          mode={"datetime"}
          locale={"pt-Br"}
          onChange={handleChangeDate}
        />
        <Box mt={8}>
          <Button onPress={handleEdit}>Editar alerta</Button>
        </Box>
      </VStack>
    </Layout>
  );
};
