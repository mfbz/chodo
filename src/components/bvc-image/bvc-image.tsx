import React from 'react';
import { Image } from 'antd';

export const BVCImage = React.memo(function BVCImage({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) {
  return <Image src={src} width={width} height={height} preview={false} />;
});
