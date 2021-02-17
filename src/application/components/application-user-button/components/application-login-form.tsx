import React, { useState, useCallback } from 'react';
import { Input, Form } from 'antd';
import { BVCTextButton } from '../../../../components/bvc-text-button';
import { useTranslation } from 'react-i18next';
import { BVCLabel } from '../../../../components/bvc-label';
import { UserLoginResponse, LoginErrorCode } from '../../../interfaces/handler';
import { ApplicationLoginError } from './application-login-error';

export const ApplicationLoginForm = React.memo(function ApplicationLoginForm({
  onLogin,
}: {
  onLogin: (values: any) => Promise<UserLoginResponse>;
}) {
  const { t } = useTranslation();

  const [errorCode, setErrorCode] = useState<LoginErrorCode | null>(null);

  const _onLogin = useCallback(
    async values => {
      const response = await onLogin(values);
      if (!response.success) {
        setErrorCode(response.errorCode!);
      }
    },
    [onLogin],
  );

  // To clear error when i change the data
  const onChange = useCallback(() => {
    if (errorCode !== null) {
      setErrorCode(null);
    }
  }, [errorCode]);

  return (
    <Form layout={'vertical'} onFinish={_onLogin} onChange={onChange}>
      <Form.Item
        label={<BVCLabel text={'Username'} />}
        name="username"
        rules={[{ required: true, message: t('Please input a value') }]}>
        <Input />
      </Form.Item>

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
        <BVCTextButton text={'Login'} htmlType={'submit'} />
      </Form.Item>
    </Form>
  );
});
