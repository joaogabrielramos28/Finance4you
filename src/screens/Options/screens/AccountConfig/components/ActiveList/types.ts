import { SharedUserList } from "../../types";

export interface ActiveListProps {
  data: SharedUserList[];
  onDisable: (id: string) => void;
}
