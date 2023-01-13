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
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ModalConfirmation } from "./components/ModalConfirmation";

type FormData = {
  title: string;
};

const schema = Yup.object().shape({
  title: Yup.string().required("O título é obrigatório"),
});

export const ScheduleCreate = () => {
  const { colors } = useTheme();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleConfirmation = () => {
    setShowConfirmation(!showConfirmation);
  };

  const handleChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
    },
  });

  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };

  const hasTitle = !!watch("title");

  const handleCreateSchedule = (data: FormData) => {
    const { title } = data;

    try {
      PushNotificationIOS.addNotificationRequest({
        id: String(new Date().getTime()),
        badge: 1,
        body: `Ei não esqueça de pagar ${title}`,
        category: title,
        fireDate: date,
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
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  padding={4}
                  _focus={{
                    borderWidth: 1,
                    borderColor: "violetBrand.700",
                    bg: "transparent",
                  }}
                  color={colors.grayBrand[100]}
                  marginY={4}
                  value={value}
                  placeholder={"Digite o nome do alerta"}
                  onChangeText={onChange}
                />
              )}
            />

            {errors.title && (
              <Text color={"redBrand.500"} marginBottom={4}>
                Nome do alerta é obrigatório
              </Text>
            )}

            <DateTimePicker
              accentColor={colors.violetBrand[400]}
              themeVariant={"dark"}
              value={date}
              mode={"datetime"}
              locale={"pt-Br"}
              onChange={handleChangeDate}
            />

            <Text mt={4} color="grayBrand.100">
              Obs: Leve em consideração apenas o dia e o horário
            </Text>
          </Box>

          <Button
            isDisabled={!hasTitle}
            marginTop={6}
            bg={"violetBrand.700"}
            _text={{
              color: "grayBrand.200",
              bold: true,
            }}
            onPress={toggleConfirmation}
          >
            Criar transação
          </Button>
        </VStack>
      </TouchableWithoutFeedback>
      <ModalConfirmation
        date={date}
        name={getValues("title")}
        isOpen={showConfirmation}
        onCreate={handleSubmit(handleCreateSchedule)}
        onCancel={toggleConfirmation}
      />
    </>
  );
};
