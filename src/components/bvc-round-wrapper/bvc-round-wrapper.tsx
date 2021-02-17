import React from 'react';

export const BVCRoundWrapper = React.memo(function BVCRoundWrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        background: '#3F3F3F',
        border: '4px solid #D6D6D6',
        borderRadius: 10,
        ...style,
      }}>
      {children}
    </div>
  );
});
