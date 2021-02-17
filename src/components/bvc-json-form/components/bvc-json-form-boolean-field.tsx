import React from 'react';
import { FieldProps } from '@rjsf/core';
import { BVCLabel } from '../../bvc-label';
import { Switch } from 'antd';

export const BVCJSONFormBooleanField = React.memo(function BVCJSONFormBooleanField({
  name,
  formData,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BVCLabel text={name} translate={false} />
      <div>
        <Switch defaultChecked={formData} disabled={disabled} onChange={checked => onChange(checked)} />
      </div>
    </div>
  );
});
