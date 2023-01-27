import React from "react";
import { Button, Modal, Text } from "native-base";

import { IConfirmModalProps } from "./types";

export const ConfirmModal = ({
  isVisible,
  onDismiss,
  onSuccessful,
}: IConfirmModalProps) => {
  return (
    <Modal isOpen={isVisible} onClose={onDismiss}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton
          onPress={onDismiss}
          _pressed={{
            bg: "zinc.600",
          }}
        />
        <Modal.Header
          borderColor={"zinc.600"}
          bg={"zinc.700"}
          _text={{
            color: "grayBrand.100",
          }}
        >
          Deletar transação
        </Modal.Header>
        <Modal.Body bg={"zinc.700"}>
          <Text color={"grayBrand.200"} fontSize={"sm"}>
            Tem certeza que deseja deletar essa transação?
          </Text>
        </Modal.Body>
        <Modal.Footer bg={"zinc.700"} borderColor={"zinc.600"}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              _text={{
                color: "grayBrand.100",
              }}
              onPress={onDismiss}
              _pressed={{
                bg: "zinc.600",
              }}
            >
              Cancelar
            </Button>
            <Button
              bg={"violetBrand.700"}
              _text={{
                color: "grayBrand.100",
              }}
              onPress={onSuccessful}
              _pressed={{
                bg: "zinc.600",
              }}
            >
              Deletar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
