import React from 'react';
import { Link } from 'react-router-dom';
import ChodoLogoSVG from '../../../../assets/logo.svg';
import { List, Typography, Layout } from 'antd';
import { VaporButton } from '../../../../components/vapor-button';
import { PlusOutlined } from '@ant-design/icons';
import { Project } from '../../../../solana/project';
import { useMediaQuery } from 'react-responsive';

export const AppMenu = React.memo(function AppMenu({
	selectedProject,
	projects,
	onAdd,
	onSelect,
}: {
	selectedProject?: Project;
	projects: Project[];
	onAdd: () => void;
	onSelect: (project: Project) => void;
}) {
	const isSmallScreenOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

	return (
		<Layout.Sider
			width={isSmallScreenOrMobile ? '80%' : 300}
			style={{ height: '100vh', position: 'fixed', left: 0, zIndex: 10 }}
			breakpoint="lg"
			collapsedWidth="0"
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					background: '#F8F8FD',
				}}
			>
				<Layout style={{ background: '#00000000' }}>
					<Layout.Header style={{ background: '#00000000' }}>
						<div
							style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<Link to="/">
								<img src={ChodoLogoSVG} style={{ width: 120 }} alt="chodo logo" />
							</Link>
						</div>
					</Layout.Header>

					<Layout.Content style={{ background: '#00000000', padding: 50 }}>
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
								locale={{ emptyText: <div style={{ height: 0, margin: 0, padding: 0 }}></div> }}
								renderItem={(item, _index) => {
									const isSelected = item.data.index === selectedProject?.data.index;
									const isLast = _index === projects.length - 1;

									return (
										<List.Item
											style={{ cursor: 'pointer', padding: 0, marginBottom: isLast ? 0 : 8 }}
											onClick={() => {
												if (!isSelected) {
													onSelect(item);
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
												<Typography.Text strong={isSelected}>{item.data.name}</Typography.Text>
											</div>
										</List.Item>
									);
								}}
							/>
						</div>
					</Layout.Content>
				</Layout>
			</div>
		</Layout.Sider>
	);
});
