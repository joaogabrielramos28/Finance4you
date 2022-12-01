import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft, Calendar, GraduationCap } from "phosphor-react-native";
import React from "react";

export const TransactionDetails = () => {
  const { colors } = useTheme();
  const { goBack } = useNavigation();
  const handleGoBack = () => {
    goBack();
  };

  return (
    <Box flex={1} background={"background"} safeAreaY px={6}>
      <HStack alignItems={"center"} space={2}>
        <IconButton
          size={"sm"}
          icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
          onPress={handleGoBack}
        />

        <Heading color={"grayBrand.200"}>Detalhes da transação</Heading>
      </HStack>

      <HStack justifyContent={"space-evenly"} mt={8} alignItems="center">
        <HStack space={4} alignItems="center">
          <Box
            width={"54px"}
            height={"54px"}
            bg={"violetBrand.700"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={27}
          >
            <GraduationCap
              color={colors.grayBrand[300]}
              weight="fill"
              size={32}
            />
          </Box>

          <VStack space={1}>
            <Heading size={"md"} color={colors.grayBrand[200]}>
              Educação
            </Heading>
            <Text color={colors.grayBrand[300]}>Faculdade</Text>
          </VStack>
        </HStack>
        <HStack space={4} alignItems="center">
          <Box
            width={"54px"}
            height={"54px"}
            bg={"violetBrand.700"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={27}
          >
            <Calendar color={colors.grayBrand[300]} weight="fill" size={32} />
          </Box>

          <VStack space={1}>
            <Heading size={"md"} color={colors.grayBrand[200]}>
              Data
            </Heading>
            <Text color={colors.grayBrand[300]}>31/10/22</Text>
          </VStack>
        </HStack>
      </HStack>
      <VStack>
        <VStack alignItems={"center"} mt={4}>
          <Heading color={"grayBrand.200"} size={"md"}>
            Valor
          </Heading>
          <Text color={"grayBrand.300"} fontSize={"xl"}>
            R$ 1000.00
          </Text>
        </VStack>

        <VStack mt={4} space={2}>
          <Heading color={"grayBrand.200"} size={"md"}>
            Observação
          </Heading>

          <Text fontSize={"md"} color={"grayBrand.300"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};
