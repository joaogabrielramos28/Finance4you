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
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

type FormData = {
  title: string;
  date: Date;
};

const schema = Yup.object().shape({
  title: Yup.string().required("O título é obrigatório"),
  date: Yup.date().required("A data é obrigatória"),
});

export const ScheduleCreate = () => {
  const { colors } = useTheme();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      date: new Date(),
    },
  });

  const onSubmit = (data: FormData) => console.log(data);

  const { goBack } = useNavigation();

  const handleGoBack = () => {
    goBack();
  };

  const handleCreateSchedule = (data: FormData) => {
    const { date, title } = data;

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
      console.log("com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, onBlur, value } }) => (
              <DateTimePicker
                accentColor={colors.violetBrand[400]}
                themeVariant={"dark"}
                value={value}
                mode={"datetime"}
                locale={"pt-Br"}
                onChange={onChange}
              />
            )}
          />
        </Box>

        <Button
          marginTop={6}
          bg={"violetBrand.700"}
          _text={{
            color: "grayBrand.200",
            bold: true,
          }}
          onPress={handleSubmit(handleCreateSchedule)}
        >
          Criar transação
        </Button>
      </VStack>
    </TouchableWithoutFeedback>
  );
};
