import React, { useEffect, useState } from "react";
import {
  AddIcon,
  Box,
  Divider,
  Fab,
  FlatList,
  Heading,
  Spinner,
  Text,
  VStack,
  useTheme,
} from "native-base";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { Layout } from "@components/Layout";
import { PanGestureHandler } from "react-native-gesture-handler";
import { INotification } from "./screens/types";
import { useNavigation } from "@react-navigation/native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { closestIndexTo, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScheduleItem } from "./components/ScheduleItem";
import { HoldItem } from "react-native-hold-menu";

const FabAnimated = Animated.createAnimatedComponent(Fab);

export const Home = () => {
  const { navigate, goBack } = useNavigation();

  const [schedules, setSchedules] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const nextSchedule = closestIndexTo(
    new Date(),
    schedules.map((schedule) => new Date(schedule.date))
  );

  const handleDeleteSchedule = (id: string) => {
    PushNotificationIOS.removePendingNotificationRequests([id]);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleMoveToEditPage = (schedule: INotification) => {
    navigate("ScheduleEdit", {
      schedule,
    });
  };

  const items = [
    {
      text: "Deletar",
      isDestructive: true,
      icon: "trash",
      onPress: (id: string) => handleDeleteSchedule(id),
    },
    {
      text: "Editar",
      icon: "edit",
      onPress: (schedule: INotification) => handleMoveToEditPage(schedule),
    },
  ];
  const { colors } = useTheme();
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

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

  const handleNavigateToCreateSchedule = () => {
    navigate("ScheduleCreate");
  };

  useEffect(() => {
    PushNotificationIOS.getPendingNotificationRequests((requests) => {
      setSchedules(requests as INotification[]);

      setIsLoading(false);
    });
  }, [schedules]);
  return (
    <Layout>
      {!isLoading ? (
        <FlatList
          ListHeaderComponent={() => (
            <>
              {schedules.length > 0 ? (
                <>
                  <VStack space={4}>
                    <Heading color={"grayBrand.200"}>
                      Próximo alerta{" "}
                      <Text color={"violetBrand.500"}>
                        {formatDistanceToNow(
                          new Date(schedules[nextSchedule || 0].date),
                          {
                            addSuffix: true,
                            locale: ptBR,
                          }
                        )}
                      </Text>
                    </Heading>
                    <ScheduleItem
                      hasAnimatedView={false}
                      {...schedules[nextSchedule || 0]}
                    />
                  </VStack>
                  <Divider mt={4} bg={"zinc.600"} />
                  <Heading mt={4} color={"grayBrand.200"}>
                    Todos alertas
                  </Heading>
                </>
              ) : null}
            </>
          )}
          padding={4}
          data={schedules}
          contentContainerStyle={{ paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <HoldItem
              activateOn="tap"
              hapticFeedback="Light"
              items={items}
              actionParams={{
                Deletar: [item.id],
                Editar: [item],
              }}
            >
              <ScheduleItem key={item.id} {...item} />
            </HoldItem>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Heading mt={4} color={"grayBrand.200"}>
              Nenhum alerta criado
            </Heading>
          )}
        />
      ) : (
        <Box flex alignItems={"center"} justifyContent={"center"}>
          <Spinner size={"lg"} color={colors.violetBrand[500]} />
        </Box>
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <FabAnimated
          bottom={12}
          style={filterButtonStyle}
          renderInPortal={false}
          onPress={handleNavigateToCreateSchedule}
          shadow={2}
          background={"violetBrand.500"}
          size="sm"
          icon={<AddIcon weight="fill" color={colors.white} />}
        />
      </PanGestureHandler>
    </Layout>
  );
};
