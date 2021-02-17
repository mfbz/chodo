import React from 'react';
import { Progress } from 'antd';
import useDimensions from 'react-cool-dimensions';

export const BVCProgress = React.memo(function BVCProgress({
  progress,
  style,
}: {
  progress?: number;
  style?: React.CSSProperties;
}) {
  const { ref, height } = useDimensions();

  return (
    <div style={{ width: '100%', height: '100%' }} ref={ref as any}>
      <Progress
        percent={progress}
        showInfo={false}
        strokeLinecap={'square'}
        strokeColor={'#3CC3FF'}
        trailColor={'#787878'}
        strokeWidth={height}
      />
    </div>
  );
});
