import { Box, Fab, useTheme } from "native-base";
import React, { useEffect } from "react";
import { CreditCard } from "../../components/CreditCard";
import { ButtonGroup } from "./components/ButtonGroup";
import { TransactionsList } from "./components/TransactionsList";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Funnel } from "phosphor-react-native";
import { Layout } from "@components/Layout";

const FabAnimated = Animated.createAnimatedComponent(Fab);

export const Transactions = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

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

  const handleGoToFilterTransactions = () => {
    navigate("FilterTransactions");
  };

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
    <Layout>
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
    </Layout>
  );
};
