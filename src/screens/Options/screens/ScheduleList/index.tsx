import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Divider,
  FlatList,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { HoldItem } from "react-native-hold-menu";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { formatDistanceToNow, closestIndexTo } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ScheduleItem } from "./components/ScheduleItem";
import { INotification } from "../types";

export const ScheduleList = () => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  const [schedules, setSchedules] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PushNotificationIOS.getPendingNotificationRequests((requests) => {
      setSchedules(requests as INotification[]);

      setIsLoading(false);
    });
  }, [schedules]);

  const nextSchedule = closestIndexTo(
    new Date(),
    schedules.map((schedule) => new Date(schedule.date))
  );

  const handleDeleteSchedule = (id: string) => {
    PushNotificationIOS.removePendingNotificationRequests([id]);
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  return (
    <Box flex bg="background" safeAreaY>
      <HStack alignItems={"center"} space={4}>
        <IconButton
          onPress={goBack}
          icon={<ArrowLeft size={24} color={colors.grayBrand[200]} />}
        />
        <Heading color={"grayBrand.200"}>Alertas criados</Heading>
      </HStack>

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
              items={[
                {
                  text: "Deletar",
                  isDestructive: true,
                  icon: "trash",
                  onPress: (id) => handleDeleteSchedule(id),
                },
              ]}
              actionParams={{
                Deletar: [item.id],
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
    </Box>
  );
};
