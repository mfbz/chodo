import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { BVCIcon } from '../bvc-icon';
import { useDropdownPosition } from './hooks/use-dropdown-position';
import { BVCRoundWrapper } from '../bvc-round-wrapper';

export const BVCDropdownButton = React.memo(function BVCDropdownButton({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const { ref, top, right } = useDropdownPosition();

  const [visible, setVisible] = useState(false);

  const onClick = useCallback(() => setVisible(_visible => !_visible), []);
  //const onStopPropagation = useCallback(event => event.stopPropagation(), []);

  return (
    <>
      <Button
        type="primary"
        icon={icon}
        onClick={onClick}
        style={{
          backgroundColor: visible ? '#3F3F3F' : '#CBCBCC',
          border: '2px solid #000000',
          borderRadius: 4,
          padding: '4px 10px 5px 10px',
          margin: 0,
          textAlign: 'left',
          transition: 'none',
        }}
        ref={ref as any}>
        {visible ? (
          <BVCIcon src={require('./../../assets/ExpandArrowUp_36x36.png')} />
        ) : (
          <BVCIcon src={require('./../../assets/ExpandArrowDownDark_36x36.png')} />
        )}
      </Button>

      {visible && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
          onClick={onClick}>
          <div style={{ minWidth: 200, position: 'absolute', top: top, right: right, zIndex: 1000 }}>
            <BVCRoundWrapper>{children}</BVCRoundWrapper>
          </div>
        </div>
      )}
    </>
  );
});
