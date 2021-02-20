import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ChodoLogoSVG from '../../../../assets/logo.svg';
import { List, Typography } from 'antd';
import { Project } from '../../interfaces/project';
import { VaporButton } from '../../../../components/vapor-button';
import { PlusOutlined } from '@ant-design/icons';

export const AppMenu = React.memo(function AppMenu({
	projects,
	onAdd,
	onChange,
}: {
	projects: Project[];
	onAdd: () => void;
	onChange: (project: Project) => void;
}) {
	const [selectedProject, setSelectedProject] = useState<Project>(projects?.[0]);

	useEffect(() => {
		onChange(selectedProject);
	}, [selectedProject, onChange]);

	return (
		<div
			style={{
				width: 300,
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				paddingLeft: 48,
				paddingRight: 24,
				background: '#F8F8FD',
			}}
		>
			<div
				style={{
					height: 80,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<Link to="/">
					<img src={ChodoLogoSVG} style={{ width: 120 }} alt="chodo logo" />
				</Link>
			</div>

			<div style={{ flex: 1, marginTop: 24 }}>
				<List
					header={<Typography.Text strong={true}>Projects</Typography.Text>}
					footer={
						<div
							style={{
								width: '100%',
								background: undefined,
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<VaporButton icon={<PlusOutlined />} type={'text'} onClick={onAdd}>
								Add project
							</VaporButton>
						</div>
					}
					dataSource={projects}
					split={false}
					renderItem={(item, index) => {
						const isSelected = item.id === selectedProject.id;
						const isLast = index === projects.length - 1;

						return (
							<List.Item
								style={{ cursor: 'pointer', padding: 0, marginBottom: isLast ? 0 : 8 }}
								onClick={() => {
									if (!isSelected) {
										setSelectedProject(item);
									}
								}}
							>
								<div
									style={{
										width: '100%',
										background: isSelected ? '#FFFFFF' : undefined,
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center',
										borderRadius: 8,
										paddingTop: 8,
										paddingBottom: 8,
										paddingLeft: 16,
										paddingRight: 16,
									}}
								>
									<Typography.Text strong={isSelected}>{item.name}</Typography.Text>
								</div>
							</List.Item>
						);
					}}
				/>
			</div>
		</div>
	);
});
