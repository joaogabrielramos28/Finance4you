import React from "react";
import { HStack, Heading, Button } from "native-base";
import { HeaderProps } from "./types";

export function Header({ onBack, onReset }: HeaderProps) {
  return (
    <HStack w={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Button
        _pressed={{ bg: "zinc.700" }}
        w={"container"}
        maxW={"170px"}
        width={"100%"}
        variant={"ghost"}
        onPress={onBack}
        _text={{
          fontSize: "md",
          color: "grayBrand.300",
        }}
      >
        Cancelar
      </Button>
      <Heading size={"md"} color={"grayBrand.200"}>
        Filtros
      </Heading>
      <Button
        _pressed={{
          bg: "zinc.700",
        }}
        onPress={onReset}
        _text={{
          fontSize: "md",
          color: "grayBrand.300",
        }}
        maxW={"170px"}
        width={"100%"}
        variant={"ghost"}
      >
        Limpar
      </Button>
    </HStack>
  );
}
