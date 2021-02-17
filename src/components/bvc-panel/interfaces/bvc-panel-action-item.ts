export interface BVCPanelActionItem {
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  onClickDisabled?: () => void;
}
