import { Button } from "@components/Button";
import { Layout } from "@components/Layout";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft, Calendar, ArrowCircleUp } from "phosphor-react-native";
import React from "react";
import { ITransactionDetailsScreenProps } from "../../@types/navigation";
import { categories } from "../../data/category";
import { AvatarImage } from "../../utils/AvatarImage";

export const TransactionDetails = () => {
  const { params } = useRoute();

  const {
    amount,
    category,
    date,
    description,
    subCategory,
    type,
    responsible,
    amountWithoutMask,
  } = params as ITransactionDetailsScreenProps;

  const selectedCategory =
    categories.find((item) => item.name === category) ?? categories[0];

  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();
  const handleGoBack = () => {
    goBack();
  };

  const handleEditTransactions = () => {
    navigate("EditTransaction", params as ITransactionDetailsScreenProps);
  };

  return (
    <Layout px={6}>
      <VStack flex={1} justifyContent={"space-between"}>
        <Box>
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
                <selectedCategory.icon
                  color={colors.grayBrand[300]}
                  weight="fill"
                  size={32}
                />
              </Box>

              <VStack space={1}>
                <Heading size={"md"} color={colors.grayBrand[200]}>
                  {category}
                </Heading>
                <Text color={colors.grayBrand[300]}>{subCategory}</Text>
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
                <Calendar
                  color={colors.grayBrand[300]}
                  weight="fill"
                  size={32}
                />
              </Box>

              <VStack space={1}>
                <Heading size={"md"} color={colors.grayBrand[200]}>
                  Data
                </Heading>
                <Text color={colors.grayBrand[300]}>{date}</Text>
              </VStack>
            </HStack>
          </HStack>
          <VStack>
            <VStack alignItems={"center"} mt={4}>
              <Heading color={"grayBrand.200"} size={"md"}>
                Valor
              </Heading>
              <HStack alignItems={"center"} space={2}>
                <Text
                  color={type === "outcome" ? "redBrand.500" : "greenBrand.500"}
                  fontSize={"xl"}
                  mt={2}
                >
                  {type === "outcome" ? "-" : "+"} {amount}
                </Text>
              </HStack>
            </VStack>
            {responsible ? (
              <VStack alignItems={"center"} mt={4}>
                <Heading color={"grayBrand.200"} size={"md"}>
                  Responsável
                </Heading>
                <HStack alignItems={"center"} space={2} mt={2}>
                  <Avatar
                    size="sm"
                    source={{
                      uri: AvatarImage(responsible),
                    }}
                  />
                  <Text color={"grayBrand.200"} fontSize={"xl"}>
                    {responsible}
                  </Text>
                </HStack>
              </VStack>
            ) : null}

            <VStack mt={4} space={2}>
              <Heading color={"grayBrand.200"} size={"md"}>
                Observação
              </Heading>

              <Text fontSize={"md"} color={"grayBrand.300"}>
                {description}
              </Text>
            </VStack>
          </VStack>
        </Box>

        <Center>
          <Button w={"full"} onPress={handleEditTransactions}>
            Editar
          </Button>
        </Center>
      </VStack>
    </Layout>
  );
};
