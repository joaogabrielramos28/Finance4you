import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { Box, Fab, FlatList, Heading, useTheme, VStack } from "native-base";
import { Funnel } from "phosphor-react-native";
import React from "react";
import { Transaction } from "../../../../components/Transaction";
import { useTransactions } from "../../../../context/Transactions/TransactionsContext";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";

const FabAnimated = Animated.createAnimatedComponent(Fab);

export const TransactionsList = () => {
  const { transactionsByPeriod, filterTransactions } = useTransactions();
  const orderedTransactions = transactionsByPeriod.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const handleGoToFilterTransactions = () => {
    navigate("FilterTransactions");
  };

  const filteredTransactions = orderedTransactions
    .filter(
      (transaction) =>
        filterTransactions.category === "all" ||
        transaction.category === filterTransactions.category
    )
    .filter(
      (transaction) =>
        filterTransactions.amount === 0 ||
        transaction.amount <= filterTransactions.amount
    );

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const filterButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: positionX.value,
        },
        {
          translateY: positionY.value,
        },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  return (
    <VStack marginTop={4} paddingX={"32px"}>
      <Heading fontSize={"xl"} color={"grayBrand.300"}>
        Lista de transações
      </Heading>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <FabAnimated
          style={filterButtonStyle}
          renderInPortal={false}
          onPress={handleGoToFilterTransactions}
          shadow={2}
          background={"violetBrand.500"}
          size="sm"
          icon={<Funnel weight="fill" size={20} color={colors.white} />}
        />
      </PanGestureHandler>

      <Box safeAreaBottom>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 86,
          }}
          marginTop={"24px"}
          data={filteredTransactions}
          renderItem={({ item }) => (
            <Box marginTop={4}>
              <Transaction {...item} />
            </Box>
          )}
          ListEmptyComponent={
            <Box flex={1} alignItems={"center"}>
              <Heading color={"grayBrand.400"} size={"md"}>
                Nenhuma movimentação
              </Heading>
            </Box>
          }
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </VStack>
  );
};
