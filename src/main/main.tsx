import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { BVCNoConnectionOverlay } from '../components/vapor-no-connection-overlay';
import { Application } from '../application';
import { startApplication } from './start-application';
import { SolanaConfig } from '../application/store/solana';

export const Main = React.memo(function Main({ solanaConfig }: { solanaConfig: SolanaConfig }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await startApplication(solanaConfig);
      setStarted(true);
    };

    initialize();
  }, []);

  if (!started) {
    return <BVCNoConnectionOverlay onlySpinner={true} />;
  }

  return (
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  );
});
