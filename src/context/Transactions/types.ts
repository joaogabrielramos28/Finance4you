export interface ICreateTransactionContext {
  nextStep: () => void;
  prevStep: () => void;
  createTransaction: (transaction: ITransaction) => void;
  handleChangePeriod: (action: "next" | "prev") => void;
  changeCreditCard: (creditCard: "purple" | "pink" | "blue") => Promise<void>;
  step: number;
  transactions: ITransaction[];
  actualPeriod: Date;
  transactionsByPeriod: ITransaction[];
  creditCardStyle: "purple" | "pink" | "blue";
  filterTransactions: {
    category: string;
    amount: number;
    date: Date;
    responsible: string;
    hasDateFilter: string;
    hasResponsibleFilter: string;
  };
  handleSetFilterTransactions: (data: {
    category: string;
    amount: number;
    date: Date;
    responsible: string;
    hasDateFilter: "yes" | "no";
    hasResponsibleFilter: "yes" | "no";
  }) => void;
  resetFilterTransactions: () => void;
  deleteTransaction: (id: string) => Promise<void>;
  getTransactions: () => Promise<void>;
}

export interface ITransaction {
  id: string;
  category: string;
  subCategory: string;
  amount: string;
  amountWithoutMask: string;
  type: "income" | "outcome";
  date: string;
  dateFormatted: string;
  description?: string;
  responsible?: string;
}
