export interface RunlistActionItem {
  icon: React.ReactNode;
  text: string;
  disabled?: boolean;
  showConfirm?: boolean;
  onClick: () => void;
  onClickDisabled?: () => void;
}
