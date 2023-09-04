import { INotification } from "@screens/Options/screens/types";

export interface ITransactionDetailsScreenProps {
  id: string;
  category: string;
  subCategory: string;
  amount: string;
  description?: string;
  date: string;
  type: "outcome" | "income";
  responsible?: string;
  amountWithoutMask: string;
}

export interface IScheduleEditScreenProps {
  schedule: INotification;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      Home: undefined;
      ScheduleCreate: undefined;
      ScheduleEdit: IScheduleEditScreenProps;
    }
  }
}
