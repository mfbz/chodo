import React from 'react';

export const VaporLayout = React.memo(function VaporLayout({ children }: { children?: React.ReactNode }) {
  return <div style={{ width: '100%', height: '100%', minHeight: '100vh' }}>{children}</div>;
});
