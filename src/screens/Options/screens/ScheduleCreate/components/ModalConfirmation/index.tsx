import { useNavigation } from "@react-navigation/native";
import { Button, Modal, Text } from "native-base";
import React from "react";
import { IModalConfirmation } from "./types";

export const ModalConfirmation = ({
  isOpen,
  date,
  name,
  onCreate,
  onCancel,
}: IModalConfirmation) => {
  const { navigate, reset } = useNavigation();
  const handleConfirm = () => {
    onCreate();
    onCancel();
  };
  return (
    <Modal isOpen={isOpen}>
      <Modal.Content
        bgColor="zinc.700"
        borderColor={"zinc.600"}
        _text={{
          color: "grayBrand.200",
        }}
      >
        <Modal.CloseButton
          onPress={onCancel}
          _pressed={{
            bg: "transparent",
            opacity: 0.5,
          }}
          _icon={{
            color: "grayBrand.300",
          }}
        />
        <Modal.Header
          bgColor="zinc.700"
          borderColor={"zinc.600"}
          _text={{
            color: "grayBrand.200",
          }}
        >
          <Text color={"grayBrand.100"} fontSize="md">
            Criar <Text color={"violetBrand.400"}>{name} </Text>?
          </Text>
        </Modal.Header>
        <Modal.Body
          bgColor="zinc.700"
          borderColor={"zinc.600"}
          _text={{
            color: "grayBrand.200",
          }}
          width={"100%"}
        >
          <Text color={"grayBrand.200"} fontSize="md">
            Você está prestes a criar um alerta para o dia{" "}
            <Text color={"violetBrand.400"}>{String(date?.getDate())}</Text> às{" "}
            <Text color={"violetBrand.400"}>
              {String(date?.getHours()).padStart(2, "0")}:
              {String(date?.getMinutes()).padStart(2, "0")}
            </Text>{" "}
            todo mês.
          </Text>
        </Modal.Body>

        <Modal.Footer
          bgColor="zinc.700"
          borderColor={"zinc.600"}
          _text={{
            color: "grayBrand.200",
          }}
        >
          <Button.Group space={2}>
            <Button
              onPress={onCancel}
              _pressed={{
                bg: "transparent",
                opacity: 0.5,
              }}
              variant="ghost"
              _text={{
                color: "grayBrand.100",
              }}
            >
              Cancelar
            </Button>
            <Button
              onPress={handleConfirm}
              _pressed={{
                bg: "transparent",
                opacity: 0.5,
              }}
              bg={"violetBrand.700"}
              _text={{
                color: "grayBrand.100",
              }}
            >
              Confirmar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
