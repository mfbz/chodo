import React from 'react';
import { FieldProps } from '@rjsf/core';
import { Input } from 'antd';
import { BVCLabel } from '../../bvc-label';

export const BVCJSONFormStringField = React.memo(function BVCJSONFormStringField({
  name,
  formData,
  onChange,
  disabled,
}: FieldProps) {
  return (
    <div>
      <BVCLabel text={name} translate={false} />

      <Input defaultValue={formData} disabled={disabled} onChange={event => onChange(event.target.value)} />
    </div>
  );
});
