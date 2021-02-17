import React from 'react';
import { FieldProps } from '@rjsf/core';
import { Input } from 'antd';
import { BVCLabel } from '../../bvc-label';

export const BVCJSONFormNumberField = React.memo(function BVCJSONFormNumberField({
  name,
  formData,
  disabled,
  onChange,
}: FieldProps) {
  return (
    <div>
      <BVCLabel text={name} translate={false} />

      <Input
        type={'number'}
        defaultValue={formData}
        disabled={disabled}
        onChange={event => onChange(+event.target.value)}
      />
    </div>
  );
});
