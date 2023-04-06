export interface IFirstStepProps {
  maxH: "360px" | "280px";
  nextStep: () => void;
}
export interface ISecondStepProps {
  maxH: "360px" | "280px";
  nextStep: () => void;
  prevStep: () => void;
}
export interface IThirdStepProps {
  resetStep: () => void;
  prevStep: () => void;
}
