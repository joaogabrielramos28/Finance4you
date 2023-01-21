import { Box, Factory, Heading, VStack } from "native-base";
import React from "react";
import Animated, {
  FadeInLeft,
  SlideInLeft,
  SlideInUp,
} from "react-native-reanimated";

import { CircularChart } from "./components/CircularChart";
import { LastTransactions } from "./components/LastTransactions";
import { MonthSelect } from "./components/MonthSelect";

const AnimatedView = Factory(Animated.View);

export const Home = () => {
  return (
    <VStack flex={1} bg={"background"} safeAreaTop alignItems={"center"}>
      <AnimatedView entering={FadeInLeft}>
        <VStack space={4} alignItems={"center"}>
          <Heading color={"grayBrand.200"} testID="teste">
            Resumo de gastos
          </Heading>

          <MonthSelect />
          <CircularChart />

          <LastTransactions />
        </VStack>
      </AnimatedView>
    </VStack>
  );
};
