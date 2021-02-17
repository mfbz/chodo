import React from 'react';
import { ArrayFieldTemplateProps } from '@rjsf/core';
import { BVCLabel } from '../../bvc-label';
import { BVCGrid } from '../../bvc-grid';
import { BVCPanel } from '../../bvc-panel';
import { List } from 'antd';

export const BVCJSONFormArrayFieldTemplate = React.memo(function BVCJSONFormArrayFieldTemplate({
  title,
  items,
}: ArrayFieldTemplateProps) {
  return (
    <div style={{ paddingLeft: 4 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 16,
        }}>
        <BVCLabel text={title} translate={false} variant={'header'} />
      </div>

      <BVCGrid
        columns={2}
        data={items}
        renderItem={item => (
          <List.Item>
            <BVCPanel style={{ padding: 16 }} background={'#FFFFFF'}>
              {item.children}
            </BVCPanel>
          </List.Item>
        )}
      />
    </div>
  );
});
