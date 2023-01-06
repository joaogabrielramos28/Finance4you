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
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { ScheduleItem } from "./components/ScheduleItem";
import { INotification } from "../types";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  }, []);

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
                        {formatDistance(
                          new Date(schedules[0].date),
                          new Date(),
                          {
                            addSuffix: true,
                            locale: ptBR,
                          }
                        )}
                      </Text>
                    </Heading>
                    <ScheduleItem {...schedules[0]} />
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
          renderItem={({ item }) => <ScheduleItem key={item.id} {...item} />}
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
