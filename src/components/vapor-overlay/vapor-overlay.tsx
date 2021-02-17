import React from 'react';

export const VaporOverlay = React.memo(function VaporOverlay({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.75,
          background: '#FFFFFF',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10000,
        }}
      />

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10000,
        }}>
        {children}
      </div>
    </div>
  );
});
