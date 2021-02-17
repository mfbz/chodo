import React, { useMemo, useCallback } from 'react';
import JSONForm from '@rjsf/core';
import toJSONSchema from 'to-json-schema';
import { BVCJSONFormTitleField } from './components/bvc-json-form-title-field';
import { BVCJSONFormStringField } from './components/bvc-json-form-string-field';
import { BVCJSONFormNumberField } from './components/bvc-json-form-number-field';
import { BVCJSONFormBooleanField } from './components/bvc-json-form-boolean-field';
import { BVCJSONFormArrayFieldTemplate } from './components/bvc-json-form-array-field-template';
import { BVCJSONFormFieldTemplate } from './components/bvc-json-form-field-template';
import { BVCTextButton } from '../bvc-text-button';

const fields = {
  TitleField: BVCJSONFormTitleField,
  StringField: BVCJSONFormStringField,
  NumberField: BVCJSONFormNumberField,
  BooleanField: BVCJSONFormBooleanField,
};

export const BVCJSONForm = React.memo(function BVCJSONForm({
  json,
  submitText,
  disabled,
  onSubmit,
  onClickDisabled,
}: {
  json: any;
  submitText?: string;
  disabled?: boolean;
  onSubmit: (json: any) => void;
  onClickDisabled?: () => void;
}) {
  const schema = useMemo(() => {
    return toJSONSchema(json) as any;
  }, [json]);

  const _onSubmit = useCallback(({ formData }) => onSubmit(formData), [onSubmit]);

  return (
    <JSONForm
      schema={schema}
      formData={json}
      fields={fields}
      ArrayFieldTemplate={BVCJSONFormArrayFieldTemplate}
      FieldTemplate={BVCJSONFormFieldTemplate}
      disabled={disabled}
      onSubmit={disabled ? onClickDisabled : _onSubmit}>
      <div style={{ paddingBottom: 16 }}>
        <BVCTextButton text={submitText || 'Submit'} disabled={disabled} htmlType={'submit'} />
      </div>
    </JSONForm>
  );
});
