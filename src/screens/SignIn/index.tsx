import { Box, Flex, Heading, HStack, Image, VStack } from "native-base";
import SignInImage from "../../assets/signinImage.png";

import React from "react";
import { SignInButton } from "./components/SignInButton";
import { useAuth } from "../../context/Auth/AuthContext";

export const SignIn = () => {
  const { loginWithApple, loading } = useAuth();
  return (
    <Box
      safeAreaTop
      flex={1}
      bg={"background"}
      paddingX={"32px"}
      justifyContent={"center"}
    >
      <Image
        source={SignInImage}
        alt={
          "Uma mão segurando uma carteira e outra segurando um bolo de dinheiro"
        }
        testID={"logo"}
      />

      <Heading color={"grayBrand.200"} fontSize={"3xl"} marginTop={"22px"}>
        Controle suas {"\n"}finanças {"\n"}com {"\n"}facilidade
      </Heading>

      <VStack marginTop={"22px"} space={"22px"}>
        <SignInButton
          isLoading={loading}
          title="Entrar com apple"
          type="apple"
          onPress={loginWithApple}
        />
      </VStack>
    </Box>
  );
};
