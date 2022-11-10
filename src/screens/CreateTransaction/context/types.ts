export interface ICreateTransactionContext {
  nextStep: () => void;
  prevStep: () => void;
  createTransaction: (transaction: ITransaction) => void;
  step: number;
}

export interface ITransaction {
  category: string;
  subCategory: string;
  amount: string;
  type: "income" | "outcome";
  date: string;
}
