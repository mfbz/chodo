import React, { useCallback } from 'react';
import { Input, Form, Select } from 'antd';
import { HmiRun } from '../../../../wamphooks/procedures/use-procedure-hmimanager-editrun';
import { BVCTextButton } from '../../../../components/bvc-text-button';
import { SheetMaterial } from '../../../../wamphooks/procedures/use-procedure-hmimanager-getmaterials';
import { BVCLabel } from '../../../../components/bvc-label';
import { BVCUserTextLengthLabel } from '../../../../components/bvc-length-label';

export const EditRunForm = React.memo(function EditRunForm({
  initialValue,
  materialArray,
  onEdit,
}: {
  initialValue?: HmiRun;
  materialArray: SheetMaterial[] | null;
  onEdit: (values: any) => void;
}) {
  const onEditCallback = useCallback(
    (values: any) => {
      // Set default values if empty in order to have a filled run object
      onEdit({
        id: initialValue?.id || values?.id || 0,
        quantityToDo: values?.quantityToDo || 0,
        length: values?.length || 0,
        width: values?.width || 0,
        thickness: values?.thickness || 0,
        materialName: initialValue?.materialName || '',
        materialCode: values?.materialCode || 0,
        cuttingPlan: values?.cuttingPlan || '',
        guid: initialValue?.guid || '',
      });
    },
    [initialValue, onEdit],
  );

  return (
    <Form initialValues={{ ...initialValue }} layout={'vertical'} onFinish={onEditCallback}>
      <Form.Item label={<BVCLabel text={'Id'} />} name="id" hidden={initialValue !== undefined}>
        <Input type={'number'} />
      </Form.Item>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, marginRight: 8 }}>
          <Form.Item label={<BVCUserTextLengthLabel value={'Length'} />} name="length">
            <Input type={'number'} />
          </Form.Item>
        </div>

        <div style={{ flex: 1, marginLeft: 8, marginRight: 8 }}>
          <Form.Item label={<BVCUserTextLengthLabel value={'Width'} />} name="width">
            <Input type={'number'} />
          </Form.Item>
        </div>

        <div style={{ flex: 1, marginLeft: 8 }}>
          <Form.Item label={<BVCUserTextLengthLabel value={'Thickness'} />} name="thickness">
            <Input type={'number'} />
          </Form.Item>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, marginRight: 8 }}>
          <Form.Item label={<BVCLabel text={'Quantity'} />} name="quantityToDo">
            <Input type={'number'} />
          </Form.Item>
        </div>

        <div style={{ flex: 1, marginLeft: 8 }}>
          <Form.Item label={<BVCLabel text={'Cutting plan'} />} name="cuttingPlan">
            <Input />
          </Form.Item>
        </div>
      </div>

      <Form.Item
        label={<BVCLabel text={'Material'} />}
        name="materialCode"
        hidden={materialArray === null || !materialArray?.length}>
        <Select allowClear={false}>
          {materialArray?.map((material, index) => (
            <Select.Option value={material.code} key={index + 1}>
              {material.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
        <BVCTextButton text={initialValue ? 'Edit' : 'Add'} htmlType={'submit'} />
      </Form.Item>
    </Form>
  );
});
