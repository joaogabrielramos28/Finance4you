import React, { useState } from "react";
import { Box, Button, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { useTransactions } from "@context/Transactions/TransactionsContext";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Header } from "./components/Header";
import { FilterForm } from "./components/FilterForm";
import { Layout } from "@components/Layout";

export const FilterTransactions = () => {
  const {
    handleSetFilterTransactions,
    filterTransactions,
    resetFilterTransactions,
  } = useTransactions();

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

  const handleChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    const currentDate = date || new Date();
    setDate(currentDate);
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
    <Layout>
      <VStack flex={1} justifyContent={"space-between"}>
        <Box>
          <Header onBack={handleGoBack} onReset={handleResetFilter} />
          <FilterForm
            category={category}
            value={value}
            showDateFilter={showDateFilter}
            date={date}
            responsible={responsible}
            showResponsibleFilter={showResponsibleFilter}
            onChangeShowResponsibleFilter={setShowResponsibleFilter}
            onChangeResponsible={handleChangeResponsible}
            onChangeDate={handleChangeDate}
            onChangeShowDateFilter={setShowDateFilter}
            onChangeMaxValue={handleChangeMaxValue}
            onChangeCategory={handleChangeCategory}
          />
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
    </Layout>
  );
};
