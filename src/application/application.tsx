import React from 'react';
import { useInitializeLanguage } from './hooks/use-initialize-language';
import { I18nextProvider } from 'react-i18next';
import { useWampConnected } from './hooks/use-wamp-connected';
import { BVCNoConnectionOverlay } from '../components/vapor-no-connection-overlay';
import { ApplicationHeader } from './components/application-header/application-header';
import { ApplicationBody } from './components/application-body/application-body';
import { ApplicationModal } from './components/application-modal';
import { useUrlLoginEffect } from './hooks/use-url-login-effect';

export const Application = React.memo(function Application() {
  // An effect to login wether i'm not logged and correct query params are received
  useUrlLoginEffect();

  const i18nInstance = useInitializeLanguage();
  const wampConnected = useWampConnected();

  if (!i18nInstance) {
    return null;
  }

  return (
    <I18nextProvider i18n={i18nInstance}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ApplicationHeader />

        <div style={{ flex: 1, marginTop: 2 }}>
          <ApplicationBody />
        </div>

        <ApplicationModal />

        {!wampConnected && <BVCNoConnectionOverlay />}
      </div>
    </I18nextProvider>
  );
});
