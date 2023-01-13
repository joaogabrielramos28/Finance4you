export interface IModalConfirmation {
  onCreate: () => void;
  onCancel: () => void;
  isOpen: boolean;
  name: string;
  date: Date;
}
