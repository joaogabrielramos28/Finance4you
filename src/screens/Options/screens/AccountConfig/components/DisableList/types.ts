import { SharedUserList } from "../../types";

export interface DisableListProps {
  data: SharedUserList[];
  onActivate: (id: string) => void;
}
