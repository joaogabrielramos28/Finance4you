import { Button, HStack, Image, Modal, Radio, VStack } from "native-base";
import React, { useState } from "react";
import CardOne from "../../../../assets/card1.png";
import CardTwo from "../../../../assets/card2.png";
import CardThree from "../../../../assets/card3.png";
import { useCreateTransaction } from "../../../../context/CreateTransactionContext";
import { IModalCardConfig } from "./types";

export const ModalCardConfig = ({ onClose, isOpen }: IModalCardConfig) => {
  const { creditCardStyle, changeCreditCard } = useCreateTransaction();
  const [draftCreditCardValue, setDraftCreditCardValue] = useState<
    "purple" | "pink" | "blue"
  >("purple");
  const modalBg = "zinc.800";
  const textColor = "grayBrand.300";

  const handleChangeCreditCardStyle = () => {
    changeCreditCard(draftCreditCardValue);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px" background={modalBg}>
        <Modal.CloseButton />
        <Modal.Header
          background={modalBg}
          borderColor={"zinc.600"}
          _text={{
            color: "grayBrand.200",
          }}
        >
          Alterar Cartão
        </Modal.Header>
        <Modal.Body background={modalBg}>
          <Radio.Group
            defaultValue={creditCardStyle}
            onChange={(nextValue: "purple" | "pink" | "blue") =>
              setDraftCreditCardValue(nextValue)
            }
            name="myRadioGroup"
            _radio={{
              colorScheme: "violet",
            }}
            accessibilityLabel={"Select your card color"}
          >
            <HStack space={12}>
              <VStack alignItems={"center"} space={4}>
                <Radio
                  value="purple"
                  flexDirection={"column"}
                  accessibilityLabel={"purple card"}
                />
                <Image source={CardOne} alt={"Credit Card purple"} />
              </VStack>
              <VStack alignItems={"center"} space={4}>
                <Radio value="pink" accessibilityLabel={"pink card"} />
                <Image source={CardTwo} alt={"Credit Card pink"} />
              </VStack>
              <VStack alignItems={"center"} space={4}>
                <Radio value="blue" accessibilityLabel={"blue card"} />
                <Image source={CardThree} alt={"Credit Card blue"} />
              </VStack>
            </HStack>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer background={modalBg} borderColor={"zinc.600"}>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="background"
              onPress={onClose}
              _text={{
                color: textColor,
              }}
            >
              Cancelar
            </Button>
            <Button
              onPress={handleChangeCreditCardStyle}
              bgColor={"violetBrand.700"}
              _text={{
                color: "grayBrand.200",
              }}
            >
              Salvar
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
