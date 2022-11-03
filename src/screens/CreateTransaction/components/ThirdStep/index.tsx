import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  VStack,
  useTheme,
  HStack,
  Text,
} from "native-base";
import StepThree from "../../../../assets/step3.png";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
  Money,
} from "phosphor-react-native";

export const ThirdStep = () => {
  const { colors } = useTheme();
  return (
    <Box flex={1} bg={"background"}>
      <Box
        w={"100%"}
        bg={"background"}
        shadow={8}
        safeAreaY={6}
        paddingY={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading color={"grayBrand.300"}>App</Heading>
      </Box>

      <VStack alignItems={"center"} marginTop={"8px"}>
        <Heading fontSize={"2xl"} color={"grayBrand.200"}>
          Selecione o valor
        </Heading>
        <Image source={StepThree} marginTop={"8px"} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <Input
            padding={"12px"}
            InputLeftElement={<CurrencyDollar color={colors.grayBrand[200]} />}
          />

          <HStack w={"100%"} space={"16px"} justifyContent={"space-between"}>
            <Button width={"140px"} padding={"16px"} bg={"zinc.700"}>
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleUp color={colors.greenBrand[500]} />

                <Text color={"grayBrand.300"}>Entrada</Text>
              </HStack>
            </Button>

            <Button width={"140px"} padding={"16px"} bg={"zinc.700"}>
              <HStack alignItems={"center"} space={"4px"}>
                <ArrowCircleDown color={colors.redBrand[500]} />
                <Text color={"grayBrand.300"}>Entrada</Text>
              </HStack>
            </Button>
          </HStack>
          <Button
            marginTop={"16px"}
            bg={"violetBrand.700"}
            _text={{
              color: "grayBrand.200",
              bold: true,
            }}
          >
            Criar transação
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
