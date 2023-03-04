import { Box, Heading, VStack } from "native-base";
import SignInImage from "../../assets/signinImage.png";

import React from "react";
import { SignInButton } from "./components/SignInButton";
import { useAuth } from "../../context/Auth/AuthContext";
import Animated, {
  FadeInDown,
  FadeInLeft,
  FlipInEasyY,
} from "react-native-reanimated";
import { Layout } from "@components/Layout";

export const SignIn = () => {
  const { loginWithApple, loading } = useAuth();
  return (
    <Layout paddingX={"32px"} justifyContent={"center"}>
      <Box alignSelf={"center"}>
        <Animated.Image
          source={SignInImage}
          entering={FlipInEasyY}
          testID={"logo"}
        />
      </Box>

      <Animated.View entering={FadeInLeft}>
        <Heading color={"grayBrand.200"} fontSize={"3xl"} marginTop={"22px"}>
          Controle suas {"\n"}finanças {"\n"}com {"\n"}facilidade
        </Heading>
      </Animated.View>
      <Animated.View entering={FadeInDown}>
        <VStack marginTop={"22px"} space={"22px"}>
          <SignInButton
            isLoading={loading}
            title="Entrar com apple"
            type="apple"
            onPress={loginWithApple}
          />
        </VStack>
      </Animated.View>
    </Layout>
  );
};
