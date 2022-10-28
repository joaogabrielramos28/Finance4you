import { Box, Flex, Heading, HStack, Image, VStack } from "native-base";
import SignInImage from "../../assets/signinImage.png";

import React from "react";
import { SignInButton } from "./components/SignInButton";

export const SignIn = () => {
  return (
    <Box
      safeAreaTop
      flex={1}
      bg={"background"}
      paddingX={"32px"}
      justifyContent={"center"}
    >
      <Image source={SignInImage} />

      <Heading color={"grayBrand.200"} fontSize={"3xl"} marginTop={"22px"}>
        Controle suas {"\n"}finanças {"\n"}com {"\n"}facilidade
      </Heading>

      <VStack marginTop={"22px"} space={"22px"}>
        <SignInButton title="Entrar com apple" type="apple" />
        <SignInButton title="Entrar com google" type="google" />
      </VStack>
    </Box>
  );
};
