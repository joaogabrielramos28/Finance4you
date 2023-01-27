import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export interface FilterFormProps {
  category: string;
  value: number;
  showDateFilter: "yes" | "no";
  date: Date;
  responsible: string;
  showResponsibleFilter: "yes" | "no";
  onChangeShowResponsibleFilter: (value: "yes" | "no") => void;
  onChangeResponsible: (value: string) => void;
  onChangeDate: (event: DateTimePickerEvent, date?: Date) => void;
  onChangeShowDateFilter: (value: "yes" | "no") => void;
  onChangeCategory: (category: string) => void;
  onChangeMaxValue: (value: number) => void;
}
