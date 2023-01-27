import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Modal,
  Select as SelectNativeBase,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { MonthYearPicker } from "../../../../components/MonthYearPicker";
import { Select } from "../../../../components/Select";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";
import { ExportInCsvService } from "../../../../services/ExportInCsv";
import { ExportInXlsxService } from "../../../../services/ExportInXlsx";
import { capitalize } from "../../../../utils/CapitalizeString";

type ExportType = "CSV" | "XLSX";

enum ExportTypeEnum {
  CSV = "CSV",
  XLSX = "XLSX",
}

export const ExportTransactions = () => {
  const [date, setDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportType, setExportType] = useState<ExportType>(ExportTypeEnum.CSV);
  const { goBack } = useNavigation();
  const { colors } = useTheme();
  const { transactions } = useTransactions();
  const [loading, setLoading] = useState(false);

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleGoBack = () => {
    goBack();
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const csvService = new ExportInCsvService();
  const xlsxService = new ExportInXlsxService();

  const handleExport = () => {
    setLoading(true);
    if (exportType === ExportTypeEnum.CSV) {
      csvService.createCsvFile(transactions, date);
    } else {
      xlsxService.createXlsxFile(transactions, date);
    }
    setLoading(false);
  };

  return (
    <VStack flex={1} bg={"background"} safeAreaY padding={6}>
      <HStack alignItems={"center"} space={4}>
        <IconButton
          onPress={handleGoBack}
          icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
        />
        <Heading color={"grayBrand.200"}>Exportar transações</Heading>
      </HStack>
      <VStack mt={4} space={4}>
        <Box>
          <Text color={"grayBrand.200"} fontSize={"lg"}>
            Periodo selecionado
          </Text>
          <HStack alignItems={"center"}>
            <Text fontSize={"md"} color={"grayBrand.400"}>
              {capitalize(
                format(date, "MMMM 'de' yyyy", {
                  locale: ptBR,
                })
              )}
            </Text>
            <Button
              onPress={handleToggleModal}
              variant={"ghost"}
              _text={{
                fontSize: "sm",
                bold: true,
                color: "violetBrand.500",
              }}
            >
              Alterar
            </Button>
          </HStack>
        </Box>

        <Box>
          <Text color={"grayBrand.200"} fontSize={"lg"}>
            Tipo de exportação
          </Text>
          <Select
            mt={4}
            selectedValue={exportType}
            onValueChange={(itemValue: ExportType) => setExportType(itemValue)}
          >
            <SelectNativeBase.Item value={ExportTypeEnum.CSV} label="CSV" />
            <SelectNativeBase.Item value={ExportTypeEnum.XLSX} label="XLSX" />
          </Select>
        </Box>
      </VStack>

      <Box>
        <Button
          isLoading={loading}
          mt={8}
          colorScheme={"violetBrand"}
          _text={{ color: "white" }}
          onPress={handleExport}
        >
          Exportar
        </Button>
      </Box>

      <Modal onClose={handleToggleModal} isOpen={isModalOpen} paddingX={4}>
        <MonthYearPicker
          transactions={transactions}
          date={date}
          changeDate={handleDateChange}
        />
      </Modal>
    </VStack>
  );
};
