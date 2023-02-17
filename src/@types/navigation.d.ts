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
}

export interface IScheduleEditScreenProps {
  schedule: INotification;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      Home: undefined;
      Transactions: undefined;
      CreateTransaction: undefined;
      FilterTransactions: undefined;
      TransactionDetails: ITransactionDetailsScreenProps;
      Options: undefined;
      ScheduleCreate: undefined;
      ScheduleList: undefined;
      ScheduleEdit: IScheduleEditScreenProps;
      ExportTransactions: undefined;
      AccountConfig: undefined;
      RecurrentTransactionsList: undefined;
      RecurrentTransactionsCreate: undefined;
      RecurrentTransactions: undefined;
    }
  }
}
