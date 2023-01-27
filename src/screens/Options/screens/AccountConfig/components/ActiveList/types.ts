import { SharedUserList } from "@context/auth/types";

export interface ActiveListProps {
  data: SharedUserList[];
  onDisable: (id: string) => void;
}
