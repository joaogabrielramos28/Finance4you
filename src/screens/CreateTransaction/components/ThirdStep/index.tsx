import React, { useState } from "react";
import {
  Button as NativeBaseButton,
  Heading,
  VStack,
  useTheme,
  HStack,
  Text,
  TextArea,
  KeyboardAvoidingView,
  Select as SelectNativeBase,
  Avatar,
} from "native-base";
import { Masks } from "react-native-mask-input";
import { ArrowCircleDown, ArrowCircleUp, Info } from "phosphor-react-native";
import { useFormContext } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import { useTransactions } from "@context/Transactions/TransactionsContext";
import { MaskInput } from "@components/MaskInput";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@context/Auth/AuthContext";
import { AvatarImage } from "@utils/AvatarImage";
import { Select } from "@components/Select";
import { Button } from "@components/Button";
import { Checkbox } from "@components/Checkbox";
import { Input } from "@components/Input";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export const ThirdStep = () => {
  const { colors } = useTheme();
  const { createTransaction, prevStep } = useTransactions();
  const {
    setValue,
    getValues,
    reset,
    formState: { isValid },
  } = useFormContext();
  const { navigate } = useNavigation();

  const [type, setType] = useState<"income" | "outcome">(getValues("type"));
  const [amount, setAmount] = useState(getValues("amount"));
  const [date, setDate] = useState(getValues("date") || new Date());
  const [description, setDescription] = useState(getValues("description"));
  const [amountWithoutMask, setAmountWithoutMask] = useState("");
  const [responsible, setResponsible] = useState(getValues("responsible"));
  const [createAlert, setCreateAlert] = useState(getValues("createAlert"));
  const [alertName, setAlertName] = useState(getValues("alertName"));

  const { hasAccountShared, user, sharedUserNameList } = useAuth();
  const handleCreateTransaction = () => {
    const amount = getValues("amount");
    const category = getValues("category");
    const subCategory = getValues("subCategory");
    const dateFormatted = format(date, "dd/MM/yyyy");
    const description = getValues("description");
    const responsible = getValues("responsible");

    const payload = {
      id: String(new Date().getTime()),
      amount,
      amountWithoutMask,
      category,
      subCategory,
      dateFormatted,
      date,
      type,
      description,
      responsible,
    };
    createTransaction(payload);
    if (createAlert === "yes") {
      handleCreateSchedule();
    }
    reset();
    navigate("Transactions");
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setValue("date", currentDate);
  };

  const handleSelectTransactionType = (type: "income" | "outcome") => {
    setType(type);
    setValue("type", type);
  };

  const handleChangeAmount = (masked: string, unmasked: string) => {
    setAmount(masked);
    setAmountWithoutMask(unmasked);
    setValue("amount", masked);
  };

  const handleChangeDescription = (description: string) => {
    setDescription(description);
    setValue("description", description);
  };

  const handleChangeResponsible = (value: string) => {
    setResponsible(value);
    setValue("responsible", value);
  };

  const handleChangeAlertCheckbox = (isSelected: "yes" | "no") => {
    setCreateAlert(isSelected);
    setValue("createAlert", isSelected);
  };

  const handleChangeAlertName = (text: string) => {
    setAlertName(text);
    setValue("alertName", text);
  };

  const handleCreateSchedule = () => {
    try {
      PushNotificationIOS.addNotificationRequest({
        id: String(new Date().getTime()),
        badge: 1,
        body: `Ei não esqueça de pagar ${alertName}`,
        category: alertName,
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
    } catch (error) {
      console.log(error);
    }
  };

  const actives = sharedUserNameList.filter((sharedUser) => sharedUser.active);

  return (
    <VStack alignItems={"center"}>
      <KeyboardAvoidingView behavior="padding" enabled>
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <Heading color={"grayBrand.300"} size={"sm"}>
            Valor
          </Heading>
          <MaskInput
            value={amount}
            onChangeText={handleChangeAmount}
            mask={Masks.BRL_CURRENCY}
          />

          <Heading color={"grayBrand.300"} size={"sm"}>
            Tipo de transação
          </Heading>

          <HStack w={"100%"} space={"16px"} justifyContent={"space-around"}>
            <NativeBaseButton
              width={"140px"}
              padding={"16px"}
              bg={"zinc.700"}
              borderWidth={type === "income" ? 2 : 0}
              onPress={() => handleSelectTransactionType("income")}
              borderColor={"violetBrand.700"}
            >
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleUp color={colors.greenBrand[500]} />

                <Text color={"grayBrand.300"}>Entrada</Text>
              </HStack>
            </NativeBaseButton>

            <NativeBaseButton
              width={"140px"}
              padding={"16px"}
              bg={"zinc.700"}
              onPress={() => handleSelectTransactionType("outcome")}
              borderWidth={type === "outcome" ? 2 : 0}
              borderColor={"violetBrand.700"}
            >
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleDown color={colors.redBrand[500]} />
                <Text color={"grayBrand.300"}>Saída</Text>
              </HStack>
            </NativeBaseButton>
          </HStack>
          <Heading color={"grayBrand.300"} size={"sm"}>
            Data da transação
          </Heading>

          <DateTimePicker
            accentColor={colors.violetBrand[400]}
            maximumDate={new Date()}
            themeVariant={"dark"}
            value={date}
            mode={"date"}
            locale={"pt-Br"}
            onChange={handleDateChange}
          />
          <Checkbox
            onChange={(isSelected) =>
              handleChangeAlertCheckbox(isSelected ? "yes" : "no")
            }
            value="yes"
            isChecked={createAlert === "yes"}
          >
            Criar lembrete desse pagamento
          </Checkbox>

          {createAlert === "yes" ? (
            <Input
              padding={3}
              label="Nome do alerta"
              value={alertName}
              onChangeText={handleChangeAlertName}
              placeholder="Ex: Conta de luz"
            />
          ) : null}
          {hasAccountShared ? (
            <VStack>
              <Heading fontSize={"md"} color={"grayBrand.100"}>
                Responsável
              </Heading>
              <Select
                padding={2}
                mt={2}
                onValueChange={handleChangeResponsible}
                selectedValue={responsible}
              >
                <SelectNativeBase.Item
                  justifyContent={"center"}
                  startIcon={
                    <Avatar
                      size={"sm"}
                      source={{
                        uri: user?.photo,
                      }}
                    />
                  }
                  label={user?.name!}
                  value={user?.name!}
                />
                {actives.map((sharedUser) => (
                  <SelectNativeBase.Item
                    key={sharedUser.id}
                    startIcon={
                      <Avatar
                        size={"sm"}
                        source={{
                          uri: AvatarImage(sharedUser.name),
                        }}
                      />
                    }
                    label={sharedUser.name}
                    value={sharedUser.name}
                  />
                ))}
              </Select>
            </VStack>
          ) : null}
          <HStack alignItems={"center"} space={2}>
            <Info color={colors.grayBrand[200]} size={20} />
            <Heading color={"grayBrand.300"} size={"sm"} alignItems={"center"}>
              Observação
            </Heading>
          </HStack>

          <TextArea
            autoCompleteType={"off"}
            padding={"12px"}
            value={description}
            onChangeText={handleChangeDescription}
            color={"grayBrand.200"}
            _focus={{
              borderColor: "violetBrand.700",
              backgroundColor: "transparent",
            }}
          />

          <Button
            onPress={handleCreateTransaction}
            isDisabled={
              !getValues("amount") ||
              !getValues("type") ||
              (!getValues("responsible") && hasAccountShared) ||
              (!getValues("alertName") && createAlert === "yes")
            }
            marginTop={"16px"}
          >
            Criar transação
          </Button>
          <Button variant={"outline"} onPress={prevStep} marginTop={"16px"}>
            Voltar
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </VStack>
  );
};
