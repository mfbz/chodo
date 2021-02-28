import { Spin } from 'antd';
import React from 'react';
import ChodoLogoSVG from '../../assets/logo.svg';
import { LoadingOutlined } from '@ant-design/icons';

export const VaporLoader = React.memo(function VaporLoader({ showLogo }: { showLogo?: boolean }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {showLogo && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
          }}>
          <img src={ChodoLogoSVG} style={{ width: 240 }} alt="chodo logo big" />
        </div>
      )}

      <div style={{}}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin={true} />} />
      </div>
    </div>
  );
});
