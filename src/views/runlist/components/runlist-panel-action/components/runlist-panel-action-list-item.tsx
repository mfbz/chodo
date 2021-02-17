import React, { useCallback } from 'react';
import { List } from 'antd';
import { RunlistActionItem } from '../interfaces/runlist-action-item';
import { BVCBlockButton } from '../../../../../components/bvc-block-button';
import { showMessageBox } from '../../../../../application';

export const RunlistPanelActionListItem = React.memo(function RunlistPanelActionListItem({
  item,
}: {
  item: RunlistActionItem;
}) {
  const onClick = useCallback(() => {
    if (item.showConfirm) {
      showMessageBox({
        title: 'Confirm action',
        message: 'Do you confirm to execute this action?',
        okText: 'Confirm',
        onOk: item.onClick,
      });
    } else {
      // Trigger click directly
      item.onClick();
    }
  }, [item]);

  return (
    <List.Item style={{ marginTop: -8 }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <BVCBlockButton
          icon={item.icon}
          text={item.text}
          disabled={item.disabled}
          onClick={onClick}
          onClickDisabled={item.onClickDisabled}
        />
      </div>
    </List.Item>
  );
});
