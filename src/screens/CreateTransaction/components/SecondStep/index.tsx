import React from "react";
import { Box, Button, Heading, Image, VStack } from "native-base";

import StepTwo from "../../../../assets/step2.png";
import { FormButton } from "../FormButton";

export const SecondStep = () => {
  return (
    <Box flex={1} bg={"background"}>
      <Box
        w={"100%"}
        bg={"background"}
        shadow={8}
        safeAreaY={6}
        paddingY={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading color={"grayBrand.300"}>App</Heading>
      </Box>

      <VStack alignItems={"center"} marginTop={"8px"}>
        <Heading fontSize={"2xl"} color={"grayBrand.200"}>
          Selecione a Subcategoria
        </Heading>
        <Image source={StepTwo} marginTop={"8px"} />
        <VStack w={"100%"} paddingX={"32px"} marginTop={"16px"} space={"16px"}>
          <FormButton />
          <FormButton variant="secondary" />
          <FormButton />
          <FormButton variant="secondary" />
          <FormButton />
          <FormButton variant="secondary" />
          <Button
            marginTop={"16px"}
            bg={"violetBrand.700"}
            _text={{
              color: "grayBrand.200",
              bold: true,
            }}
          >
            Avançar
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
