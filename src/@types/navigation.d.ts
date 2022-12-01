export interface ITransactionDetailsScreenProps {
  category: string;
  subCategory: string;
  amount: string;
  description: string;
  date: string;
  type: "outcome" | "income";
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
    }
  }
}
