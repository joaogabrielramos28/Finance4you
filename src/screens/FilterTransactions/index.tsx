import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Select as SelectNativeBase,
  Slider,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { categories } from "@data/category";
import { useTransactions } from "@context/Transactions/TransactionsContext";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useAuth } from "@context/Auth/AuthContext";
import { AvatarImage } from "@utils/AvatarImage";
import { Select } from "@components/Select";

export const FilterTransactions = () => {
  const {
    handleSetFilterTransactions,
    filterTransactions,
    resetFilterTransactions,
  } = useTransactions();
  const { colors } = useTheme();
  const { user, sharedUserNameList, hasAccountShared } = useAuth();
  const { goBack } = useNavigation();
  const [category, setCategory] = useState(filterTransactions.category);
  const [value, setValue] = useState(filterTransactions.amount);
  const [date, setDate] = useState<Date>(filterTransactions.date || new Date());
  const [showDateFilter, setShowDateFilter] = useState(
    filterTransactions.hasDateFilter as "yes" | "no"
  );
  const [showResponsibleFilter, setShowResponsibleFilter] = useState(
    filterTransactions.hasResponsibleFilter as "yes" | "no"
  );
  const [responsible, setResponsible] = useState(
    filterTransactions.responsible
  );

  const handleGoBack = () => {
    goBack();
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };
  const handleChangeMaxValue = (value: number) => {
    setValue(value);
  };

  const handleChangeDate = (event: DateTimePickerEvent, date: Date) => {
    setDate(date);
  };

  const handleChangeResponsible = (value: string) => {
    setResponsible(value);
  };

  const handleChangeFilter = () => {
    handleSetFilterTransactions({
      amount: value,
      category,
      date: date,
      responsible,
      hasDateFilter: showDateFilter,
      hasResponsibleFilter: showResponsibleFilter,
    });
    goBack();
  };

  const handleResetFilter = () => {
    resetFilterTransactions();
    setCategory("all");
    setValue(10000);
    setDate(new Date());
    setResponsible("");
    setShowDateFilter("no");
    setShowResponsibleFilter("no");
  };

  return (
    <Box safeArea flex={1} bg={"background"}>
      <VStack flex={1} justifyContent={"space-between"}>
        <Box>
          <HStack w={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Button
              _pressed={{ bg: "zinc.700" }}
              w={"container"}
              maxW={"170px"}
              width={"100%"}
              variant={"ghost"}
              onPress={handleGoBack}
              _text={{
                fontSize: "md",
                color: "grayBrand.300",
              }}
            >
              Cancelar
            </Button>
            <Heading size={"md"} color={"grayBrand.200"}>
              Filtros
            </Heading>
            <Button
              _pressed={{
                bg: "zinc.700",
              }}
              onPress={handleResetFilter}
              _text={{
                fontSize: "md",
                color: "grayBrand.300",
              }}
              maxW={"170px"}
              width={"100%"}
              variant={"ghost"}
            >
              Limpar
            </Button>
          </HStack>

          <VStack px={4} mt={6} space={2}>
            <Text fontSize={"md"} color={"grayBrand.200"}>
              Categoria
            </Text>

            <Select
              selectedValue={category}
              onValueChange={(itemValue) => handleChangeCategory(itemValue)}
            >
              <SelectNativeBase.Item label="Todas" value="all" />
              {categories.map((category) => (
                <SelectNativeBase.Item
                  key={category.id}
                  label={category.name}
                  value={category.name}
                />
              ))}
            </Select>

            <Divider mt={2} bg={"grayBrand.500"} />
          </VStack>
          <VStack px={4} mt={6}>
            <Text fontSize={"md"} color={"grayBrand.200"}>
              Preço até : R$ {value}
            </Text>
            <Slider
              mt={2}
              w="full"
              maxW="full"
              defaultValue={0}
              value={value}
              maxValue={10000}
              onChange={handleChangeMaxValue}
            >
              <Slider.Track>
                <Slider.FilledTrack bg={"violetBrand.400"} />
              </Slider.Track>
              <Slider.Thumb bg={"violetBrand.400"} />
            </Slider>
            <Divider mt={2} bg={"grayBrand.500"} />
          </VStack>
          <VStack px={4} mt={6} space={2}>
            <Checkbox
              onChange={(isSelected) =>
                setShowDateFilter(isSelected ? "yes" : "no")
              }
              value="yes"
              isChecked={showDateFilter === "yes"}
              _text={{
                color: "grayBrand.200",
              }}
              _checked={{
                bg: "violetBrand.400",
                borderColor: "transparent",
              }}
              _pressed={{
                bg: "transparent",
                opacity: 0.5,
              }}
            >
              Filtrar por data
            </Checkbox>

            {showDateFilter === "yes" ? (
              <DateTimePicker
                accentColor={colors.violetBrand[400]}
                maximumDate={new Date()}
                themeVariant={"dark"}
                value={date}
                mode={"date"}
                locale={"pt-Br"}
                onChange={handleChangeDate}
              />
            ) : null}
          </VStack>
          {hasAccountShared ? (
            <VStack px={4} mt={6} space={2}>
              <Checkbox
                onChange={(isSelected) =>
                  setShowResponsibleFilter(isSelected ? "yes" : "no")
                }
                value="yes"
                isChecked={showResponsibleFilter === "yes"}
                _text={{
                  color: "grayBrand.200",
                }}
                _checked={{
                  bg: "violetBrand.400",
                  borderColor: "transparent",
                }}
                _pressed={{
                  bg: "transparent",
                  opacity: 0.5,
                }}
              >
                Filtrar por responsável
              </Checkbox>

              {showResponsibleFilter === "yes" ? (
                <Select
                  padding={2}
                  mt={2}
                  onValueChange={handleChangeResponsible}
                  selectedValue={responsible}
                >
                  <SelectNativeBase.Item
                    startIcon={
                      <Avatar
                        size={"sm"}
                        source={{
                          uri: user?.photo!,
                        }}
                      />
                    }
                    label={user?.name!}
                    value={user?.name!}
                  />
                  {sharedUserNameList.map((sharedUser) => (
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
              ) : null}
            </VStack>
          ) : null}
        </Box>
        <Box py={4}>
          <Button
            onPress={handleChangeFilter}
            bg={"violetBrand.700"}
            rounded={"lg"}
            _text={{
              color: "grayBrand.200",
              fontSize: "md",
            }}
          >
            Mostrar Resultados
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
