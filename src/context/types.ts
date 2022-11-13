export interface ICreateTransactionContext {
  nextStep: () => void;
  prevStep: () => void;
  createTransaction: (transaction: ITransaction) => void;
  step: number;
  transactions: ITransaction[];
}

export interface ITransaction {
  id: string;
  category: string;
  subCategory: string;
  amount: string;
  type: "income" | "outcome";
  date: string;
  dateFormatted: string;
}
