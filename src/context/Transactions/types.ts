export interface ICreateTransactionContext {
  nextStep: () => void;
  prevStep: () => void;
  createTransaction: (transaction: ITransaction) => void;
  handleChangePeriod: (action: "next" | "prev") => void;
  changeCreditCard: (creditCard: string) => Promise<void>;
  step: number;
  transactions: ITransaction[];
  actualPeriod: Date;
  transactionsByPeriod: ITransaction[];
  creditCardStyle: "purple" | "pink" | "blue";
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