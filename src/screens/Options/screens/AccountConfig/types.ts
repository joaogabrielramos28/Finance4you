export interface SharedUserList {
  id: string;
  type: "principal" | "shared";
  name: string;
  active:boolean
}
