import { SharedUserList } from "@context/auth/types";

export interface DisableListProps {
  data: SharedUserList[];
  onActivate: (id: string) => void;
}
