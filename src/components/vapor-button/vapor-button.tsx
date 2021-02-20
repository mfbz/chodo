import { Button } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import React from 'react';

export const VaporButton = React.memo(function VaporButton({
	enlarge,
	danger,
	type = 'primary',
	icon,
	size,
	children,
	style,
}: {
	enlarge?: boolean;
	danger?: boolean;
	type?: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed';
	icon?: React.ReactNode;
	size?: SizeType;
	children?: React.ReactNode;
	style?: React.CSSProperties;
}) {
	return (
		<Button
			type={type}
			danger={danger}
			shape="round"
			icon={icon}
			size={size}
			style={{
				height: enlarge ? 60 : undefined,
				...style,
			}}
		>
			{children}
		</Button>
	);
});
