import { Box, Heading } from "native-base";
import React, { useEffect } from "react";
import { CreditCard } from "../../components/CreditCard";
import { ButtonGroup } from "./components/ButtonGroup";
import { TransactionsList } from "./components/TransactionsList";
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const Transactions = () => {
  const creditCardAnimation = useSharedValue(-300);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: creditCardAnimation.value,
        },
      ],
    };
  });

  useEffect(() => {
    creditCardAnimation.value = withTiming(-150, { duration: 1000 }, () => {
      "worklet";
    });
  }, []);
  return (
    <Box bg={"background"} flex={1} safeAreaY>
      <Animated.View style={animatedStyle}>
        <Box alignItems={"center"} zIndex={-1}>
          <CreditCard />
        </Box>
      </Animated.View>

      <Box alignItems={"center"}>
        <ButtonGroup />
      </Box>

      <Box flex={1}>
        <TransactionsList />
      </Box>
    </Box>
  );
};
