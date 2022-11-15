import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Select,
  Slider,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { CaretDown } from "phosphor-react-native";
import React, { useState } from "react";
import { categories } from "../../data/category";
import { useTransactions } from "../../context/Transactions/TransactionsContext";

export const FilterTransactions = () => {
  const {
    handleSetFilterTransactions,
    filterTransactions,
    resetFilterTransactions,
  } = useTransactions();
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const [category, setCategory] = useState(filterTransactions.category);
  const [value, setValue] = useState(filterTransactions.amount);
  const handleGoBack = () => {
    goBack();
  };

  const handleChangeCategory = (value: string) => {
    setCategory(value);
  };
  const handleChangeMaxValue = (value: number) => {
    setValue(value);
  };

  const handleChangeFilter = () => {
    handleSetFilterTransactions({ amount: value, category });
    goBack();
  };

  const handleResetFilter = () => {
    resetFilterTransactions();
    setCategory("all");
    setValue(10000);
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
              color={"grayBrand.200"}
              _actionSheetBody={{
                bg: "zinc.800",
              }}
              _actionSheetContent={{
                bg: "zinc.800",
              }}
              dropdownIcon={
                <Box marginRight={2}>
                  <CaretDown size={20} color={colors.grayBrand[400]} />
                </Box>
              }
              selectedValue={category}
              onValueChange={(itemValue) => handleChangeCategory(itemValue)}
            >
              <Select.Item
                label="Todas"
                value="all"
                _text={{
                  color: "grayBrand.200",
                }}
                bg={"zinc.800"}
              />
              {categories.map((category) => (
                <Select.Item
                  _text={{
                    color: "grayBrand.200",
                  }}
                  bg={"zinc.800"}
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
