import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChodoLogoSVG from '../../../../assets/logo.svg';
import { List, Typography, Layout } from 'antd';
import { VaporButton } from '../../../../components/vapor-button';
import Icon, { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { Project } from '../../../../solana/project';
import { useMediaQuery } from 'react-responsive';
import { AppIcon } from '../app-icon';

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
	const isSmallScreenOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
	const [isSiderOpen, setIsSiderOpen] = useState(false);

	return (
		<Layout.Sider
			trigger={isSiderOpen ? <CloseOutlined /> : <Icon style={{ fontSize: 24 }} component={AppIcon} />}
			zeroWidthTriggerStyle={{
				height: 48,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '0px 24px 24px 0px',
				paddingRight: 4,
				top: 8,
			}}
			width={isSmallScreenOrMobile ? '88%' : 300}
			style={{
				height: '100vh',
				position: isSmallScreenOrMobile ? 'fixed' : undefined,
				left: isSmallScreenOrMobile ? 0 : undefined,
				zIndex: 10,
				border: '0px solid #000000',
			}}
			breakpoint="lg"
			collapsedWidth="0"
			onCollapse={(collapsed) => setIsSiderOpen(!collapsed)}
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
					<Layout.Header
						style={{
							background: '#00000000',
							paddingLeft: isSmallScreenOrMobile ? 24 : 50,
							paddingRight: isSmallScreenOrMobile ? 24 : 50,
						}}
					>
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

					<Layout.Content
						style={{
							background: '#00000000',
							paddingLeft: isSmallScreenOrMobile ? 24 : 50,
							paddingRight: isSmallScreenOrMobile ? 24 : 50,
							paddingTop: 16,
							paddingBottom: 16,
						}}
					>
						<div style={{ flex: 1, marginTop: 0 }}>
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
