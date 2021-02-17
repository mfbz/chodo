import React from 'react';
import { Switch } from 'react-router-dom';
import { BVCRoundWrapper } from '../../../components/bvc-round-wrapper';
import { useSwitchRoutes } from './hooks/use-switch-routes';

export const ApplicationBody = React.memo(function ApplicationBody({}: {}) {
  const switchRoutes = useSwitchRoutes();

  return (
    <BVCRoundWrapper>
      <Switch>{switchRoutes}</Switch>
    </BVCRoundWrapper>
  );
});
