import {
  Fab,
  ScrollView as NativeBaseScrollView,
  useTheme,
  VStack,
} from "native-base";
import { ArrowUp } from "phosphor-react-native";
import React from "react";
import { ScrollView } from "react-native";
import { ILayout } from "./types";

export const Layout = ({
  hasScrollView = false,
  hasScrollFab = false,
  children,
  ...rest
}: ILayout) => {
  const { colors } = useTheme();
  const scrollViewRef = React.useRef<ScrollView>(null);

  const goToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const renderScrollFab = () => {
    return (
      <Fab
        onPress={goToTop}
        renderInPortal={true}
        shadow={2}
        bottom={120}
        background={"violetBrand.500"}
        size="sm"
        icon={<ArrowUp weight="bold" size={22} color={colors.white} />}
      />
    );
  };
  return (
    <VStack {...rest} flex={1} bg={"background"} safeAreaY>
      {hasScrollView ? (
        <NativeBaseScrollView {...rest} ref={scrollViewRef}>
          {children}
          {hasScrollFab ? renderScrollFab() : null}
        </NativeBaseScrollView>
      ) : (
        children
      )}
    </VStack>
  );
};
