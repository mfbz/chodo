import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { BVCSelectOption } from './interfaces/bvc-select-option';

export const BVCSelect = React.memo(function BVCSelect({
  options,
  value,
  initialValue,
  onChange,
  onClickDisabled,
  translate = true,
  disabled,
}: {
  options: BVCSelectOption[];
  value?: any;
  initialValue?: any;
  onChange?: (value: any) => void;
  onClickDisabled?: () => void;
  translate?: boolean;
  disabled?: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Select
      value={value}
      defaultValue={initialValue}
      disabled={disabled}
      onChange={onChange}
      onClick={disabled ? onClickDisabled : undefined}>
      {options.map((_data, index) => (
        <Select.Option value={_data.value} key={index}>
          {translate ? t(_data.label) : _data.label}
        </Select.Option>
      ))}
    </Select>
  );
});
