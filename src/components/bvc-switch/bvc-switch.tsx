import React from 'react';
import { Switch } from 'antd';

export const BVCSwitch = React.memo(function BVCSwitch({
  checked,
  checkedChildren,
  unCheckedChildren,
  disabled,
  onChange,
  onClickDisabled,
}: {
  checked?: any;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  onClickDisabled?: () => void;
}) {
  return (
    <div style={{ minWidth: 100 }} onClick={disabled ? onClickDisabled : undefined}>
      <Switch
        checked={checked}
        onChange={onChange}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        disabled={disabled}
        style={{ minWidth: 100 }}
      />
    </div>
  );
});
