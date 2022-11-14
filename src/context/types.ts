export interface ICreateTransactionContext {
  nextStep: () => void;
  prevStep: () => void;
  createTransaction: (transaction: ITransaction) => void;
  handleChangePeriod: (action: "next" | "prev") => void;
  step: number;
  transactions: ITransaction[];
  actualPeriod: Date;
  transactionsByPeriod: ITransaction[];
}

export interface ITransaction {
  id: string;
  category: string;
  subCategory: string;
  amount: number;
  amountFormatted: string;
  type: "income" | "outcome";
  date: string;
  dateFormatted: string;
}
