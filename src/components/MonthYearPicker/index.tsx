import React from "react";
import { Box, Button, HStack, IconButton, Text, useTheme } from "native-base";
import { CaretRight, CaretLeft } from "phosphor-react-native";
import { setMonth, addYears, subYears, format, getYear } from "date-fns";
import months from "./data";
import { ptBR } from "date-fns/locale";
import { MonthYearPickerProps } from "./types";
import { compareDesc } from "date-fns/esm";

export const MonthYearPicker = ({
  date,
  changeDate,
  transactions,
}: MonthYearPickerProps) => {
  const { colors } = useTheme();

  const getAllPeriodsTransactionsDifferent = () => {
    const dates = transactions?.map((transaction) => {
      return format(new Date(transaction.date), "01/MM/yyyy");
    });

    return dates
      ?.filter((item, index) => dates.indexOf(item) === index)
      .sort((a, b) => {
        return compareDesc(new Date(a), new Date(b));
      });
  };

  const handleSetMonth = (month: number) => {
    changeDate(setMonth(date, month));
  };

  const handleAddYear = () => {
    changeDate(addYears(date, 1));
  };

  const handleSubYear = () => {
    changeDate(subYears(date, 1));
  };

  const maxYear = getAllPeriodsTransactionsDifferent()[0];
  const minYear =
    getAllPeriodsTransactionsDifferent()[
      getAllPeriodsTransactionsDifferent().length - 1
    ];

  const isMaxYear = getYear(date) === getYear(new Date(maxYear));
  const isMinYear = getYear(date) === getYear(new Date(minYear));

  return (
    <Box padding={4} backgroundColor={"zinc.700"} borderRadius={4}>
      <Box
        flexDirection={"row"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Text
          color={"grayBrand.200"}
          fontSize={"lg"}
          textTransform={"capitalize"}
        >
          {format(date, "MMMM yyyy", { locale: ptBR })}
        </Text>
        <Box flexDirection={"row"} alignItems="center">
          <IconButton
            _pressed={{
              backgroundColor: "transparent",
              opacity: 0.5,
            }}
            isDisabled={isMinYear}
            onPress={handleSubYear}
            icon={<CaretLeft color={colors.grayBrand[300]} size={20} />}
          />
          <Text color={"grayBrand.200"} fontSize={"lg"}>
            {date.getFullYear()}
          </Text>
          <IconButton
            _pressed={{
              backgroundColor: "transparent",
              opacity: 0.5,
            }}
            isDisabled={isMaxYear}
            onPress={handleAddYear}
            icon={<CaretRight color={colors.grayBrand[300]} size={20} />}
          />
        </Box>
      </Box>
      <HStack flexDirection={"row"} flexWrap={"wrap"} space={2} paddingY={4}>
        {months.map((month) => (
          <Button
            key={month.id}
            isDisabled={
              !getAllPeriodsTransactionsDifferent().includes(
                format(setMonth(date, month.id), "01/MM/yyyy")
              )
            }
            alignItems={"center"}
            width={"60px"}
            height={"40px"}
            marginTop={"10px"}
            marginLeft={"10px"}
            background={"transparent"}
            borderWidth={1}
            borderColor="grayBrand.400"
            onPress={() => handleSetMonth(month.id)}
            backgroundColor={
              date.getMonth() === month.id ? "violetBrand.600" : "transparent"
            }
          >
            <Text color={"grayBrand.300"}>{month.name}</Text>
          </Button>
        ))}
      </HStack>
    </Box>
  );
};
