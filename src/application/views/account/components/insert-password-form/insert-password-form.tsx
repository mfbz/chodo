import React, { useCallback, useState } from 'react';
import { Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { BVCLabel } from '../../../../../components/bvc-label';
import { BVCTextButton } from '../../../../../components/bvc-text-button';
import { ApplicationLoginError } from '../../../../components/application-user-button/components/application-login-error';
import { UserLoginResponse, LoginErrorCode } from '../../../../interfaces/handler';

export const InsertPasswordForm = React.memo(function InsertPasswordForm({
  onUpdate,
}: {
  onUpdate: (password: string) => Promise<UserLoginResponse>;
}) {
  const { t } = useTranslation();

  const [errorCode, setErrorCode] = useState<LoginErrorCode | null>(null);

  const _onUpdate = useCallback(
    async values => {
      const response = await onUpdate(values.password);
      if (!response.success) {
        setErrorCode(response.errorCode!);
      }
    },
    [onUpdate],
  );

  // To clear error when i change the data
  const onChange = useCallback(() => {
    if (errorCode !== null) {
      setErrorCode(null);
    }
  }, [errorCode]);

  return (
    <Form layout={'vertical'} onFinish={_onUpdate} onChange={onChange}>
      <Form.Item
        label={<BVCLabel text={'Password'} />}
        name="password"
        rules={[{ required: true, message: t('Please input a value') }]}>
        <Input.Password />
      </Form.Item>

      {errorCode !== null && (
        <div style={{ marginTop: 8, marginBottom: 16 }}>
          <ApplicationLoginError errorCode={errorCode} />
        </div>
      )}

      <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
        <BVCTextButton text={'Confirm'} htmlType={'submit'} />
      </Form.Item>
    </Form>
  );
});
