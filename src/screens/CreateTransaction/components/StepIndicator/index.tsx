import { Factory, useTheme } from "native-base";
import React from "react";
import { View } from "react-native";
import StepIndicatorLib from "react-native-step-indicator";

const StepIndicatorFactory = Factory(StepIndicatorLib);

export function StepIndicator({ step }: { step: number }) {
  const { colors } = useTheme();
  const labels = ["Categoria", "Subcategoria", "Detalhes"];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colors.violetBrand[400],
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colors.violetBrand[700],
    stepStrokeUnFinishedColor: "#aaaaaa",
    separatorFinishedColor: colors.violetBrand[700],
    separatorUnFinishedColor: "#aaaaaa",
    stepIndicatorFinishedColor: colors.violetBrand[700],
    stepIndicatorUnFinishedColor: "#ffffff",
    stepIndicatorCurrentColor: "#ffffff",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colors.violetBrand[700],
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: colors.violetBrand[700],
  };
  return (
    <StepIndicatorFactory
      customStyles={customStyles}
      currentPosition={step}
      labels={labels}
      stepCount={3}
    />
  );
}
