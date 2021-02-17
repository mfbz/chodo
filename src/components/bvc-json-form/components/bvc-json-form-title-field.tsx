import React from 'react';
import { FieldProps } from '@rjsf/core';
import { BVCLabel } from '../../bvc-label';

export const BVCJSONFormTitleField = React.memo(function BVCJSONFormTitleField({ title }: FieldProps) {
  return (
    <div style={{ borderBottom: '2px solid #CBCBCB', paddingTop: 8, paddingBottom: 8, marginBottom: 16 }}>
      <BVCLabel text={title || ''} translate={false} variant={'header'} strong={true} />
    </div>
  );
});
