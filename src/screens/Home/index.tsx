import React from "react";
import { Box, Factory, Heading, useTheme, VStack } from "native-base";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import { CircularChart } from "./components/CircularChart";
import { LastTransactions } from "./components/LastTransactions";
import { MonthSelect } from "./components/MonthSelect";
import { SharedCircularChart } from "./components/SharedCircularChart";
import { useAuth } from "@context/Auth/AuthContext";
import { Layout } from "@components/Layout";

const AnimatedView = Factory(Animated.View);

const FirstRoute = () => (
  <Box mt={4} alignItems={"center"}>
    <CircularChart />
  </Box>
);

const SecondRoute = () => (
  <Box mt={4} alignItems={"center"}>
    <SharedCircularChart />
  </Box>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export const Home = () => {
  const { colors } = useTheme();
  const { hasAccountShared } = useAuth();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Titular" },
    { key: "second", title: "Compartilhado" },
  ]);

  return (
    <Layout alignItems={"center"}>
      <AnimatedView entering={FadeInLeft}>
        <VStack space={4} alignItems={"center"}>
          <Heading color={"grayBrand.200"} testID="teste">
            Resumo de gastos
          </Heading>

          <MonthSelect />
          {hasAccountShared ? (
            <Box flex={1} width="100%">
              <TabView
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                renderTabBar={(props) => (
                  <>
                    <TabBar
                      {...props}
                      labelStyle={{
                        textTransform: "capitalize",
                        fontSize: 16,
                      }}
                      style={{
                        backgroundColor: colors.background[900],
                      }}
                      activeColor={colors.grayBrand[100]}
                      indicatorStyle={{
                        backgroundColor: colors.violetBrand[600],
                      }}
                    />
                  </>
                )}
              />
            </Box>
          ) : (
            <CircularChart />
          )}

          <LastTransactions />
        </VStack>
      </AnimatedView>
    </Layout>
  );
};
