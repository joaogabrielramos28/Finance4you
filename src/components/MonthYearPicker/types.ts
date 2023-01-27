import { ITransaction } from "@context/Transactions/types";

export interface MonthYearPickerProps {
  date: Date;
  changeDate: (date: Date) => void;
  transactions: ITransaction[];
}
