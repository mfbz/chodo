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
	onClick,
}: {
	enlarge?: boolean;
	danger?: boolean;
	type?: 'link' | 'text' | 'ghost' | 'primary' | 'default' | 'dashed';
	icon?: React.ReactNode;
	size?: SizeType;
	children?: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) {
	return (
		<Button
			type={type}
			danger={danger}
			shape="round"
			icon={icon}
			size={size}
			onClick={onClick}
			style={{
				height: enlarge ? 60 : undefined,
				...style,
			}}
		>
			{children}
		</Button>
	);
});
