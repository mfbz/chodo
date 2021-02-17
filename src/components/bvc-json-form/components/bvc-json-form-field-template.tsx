import React from 'react';
import { FieldTemplateProps } from '@rjsf/core';

export const BVCJSONFormFieldTemplate = React.memo(function BVCJSONFormFieldTemplate({ children }: FieldTemplateProps) {
  return <div style={{ marginBottom: 16 }}>{children}</div>;
});
