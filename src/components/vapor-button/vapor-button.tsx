import { Button } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

export const VaporButton = React.memo(function VaporButton({
	danger,
	type = 'primary',
	icon,
	size,
	children,
}: {
	danger?: boolean;
	type?: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed';
	icon?: React.ReactNode;
	size?: SizeType;
	children?: React.ReactNode;
}) {
	return (
		<Button type={type} danger={danger} shape="round" icon={icon} size={size}>
			{children}
		</Button>
	);
});
