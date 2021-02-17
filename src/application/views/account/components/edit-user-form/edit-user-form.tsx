import React, { useCallback } from 'react';
import { Input, Form, Select } from 'antd';
import { User } from '../../../../interfaces/user';
import { Language } from '../../../../interfaces/language';
import { BVCLabel } from '../../../../../components/bvc-label';
import { BVCTextButton } from '../../../../../components/bvc-text-button';
import { useTranslation } from 'react-i18next';

export const EditUserForm = React.memo(function EditUserForm({
  initialValue,
  languages,
  onEdit,
}: {
  initialValue: User;
  languages: Language[];
  onEdit: (values: any) => void;
}) {
  const { t } = useTranslation();

  const onEditCallback = useCallback(
    (values: any) => {
      onEdit({
        id: initialValue.id,
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username,
        role: values.role,
        language: values.language,
        measurementSystem: values.measurementSystem,
      });
    },
    [initialValue, onEdit],
  );

  return (
    <Form initialValues={{ ...initialValue }} layout={'vertical'} onFinish={onEditCallback}>
      <Form.Item
        label={<BVCLabel text={'Username'} />}
        name="username"
        rules={[{ required: true, message: t('Please input a value') }]}>
        <Input disabled={true} />
      </Form.Item>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, marginRight: 8 }}>
          <Form.Item
            label={<BVCLabel text={'First name'} />}
            name="firstname"
            rules={[{ required: true, message: t('Please input a value') }]}>
            <Input disabled={initialValue.special ? true : false} />
          </Form.Item>
        </div>

        <div style={{ flex: 1, marginLeft: 8 }}>
          <Form.Item
            label={<BVCLabel text={'Last name'} />}
            name="lastname"
            rules={[{ required: true, message: t('Please input a value') }]}>
            <Input disabled={initialValue.special ? true : false} />
          </Form.Item>
        </div>
      </div>

      <Form.Item
        label={<BVCLabel text={'Role'} />}
        name="role"
        rules={[{ required: true, message: t('Please input a value') }]}>
        <Select allowClear={false} disabled={true}>
          <Select.Option value={'user'}>
            <BVCLabel text={'User'} />
          </Select.Option>

          <Select.Option value={'operator'}>
            <BVCLabel text={'Operator'} />
          </Select.Option>

          <Select.Option value={'service'}>
            <BVCLabel text={'Service'} />
          </Select.Option>
        </Select>
      </Form.Item>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, marginRight: 8 }}>
          <Form.Item
            label={<BVCLabel text={'Language'} />}
            name="language"
            rules={[{ required: true, message: t('Please input a value') }]}>
            <Select allowClear={false}>
              {languages?.map((language, index) => (
                <Select.Option value={language.value} key={index + 1}>
                  {language.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div style={{ flex: 1, marginLeft: 8 }}>
          <Form.Item
            label={<BVCLabel text={'Measurement system'} />}
            name="measurementSystem"
            rules={[{ required: true, message: t('Please input a value') }]}>
            <Select allowClear={false}>
              <Select.Option value={'metric'}>
                <BVCLabel text={'Metric'} />
              </Select.Option>

              <Select.Option value={'imperial'}>
                <BVCLabel text={'Imperial'} />
              </Select.Option>
            </Select>
          </Form.Item>
        </div>
      </div>

      <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
        <BVCTextButton text={'Edit'} htmlType={'submit'} />
      </Form.Item>
    </Form>
  );
});
