import React from 'react';

export const BVCTabMenu = React.memo(function BVCTabMenu({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 110,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'hidden',
      }}>
      {children}
    </div>
  );
});
