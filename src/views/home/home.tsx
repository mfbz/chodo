import React from 'react';
import { Link } from 'react-router-dom';
import SolanaLogoImage from '../../assets/solana-logo.png';
import ChodoHeroSVG from '../../assets/hero.svg';
import { VaporButton } from '../../components/vapor-button';
import { Typography, Layout } from 'antd';
import ChodoLogoSVG from '../../assets/logo.svg';
import { useMediaQuery } from 'react-responsive';

export const Home = React.memo(function Home() {
	const isSmallScreenOrMobile = useMediaQuery({ query: '(max-width: 992px)' });

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			{!isSmallScreenOrMobile && (
				<div
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 9,
						backgroundImage: `url(${ChodoHeroSVG})`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'right',
						backgroundSize: 'auto 100%',
					}}
				></div>
			)}

			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'absolute',
					top: 0,
					left: 0,
					zIndex: 10,
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
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div style={{}}>
								<Link to="/">
									<img src={ChodoLogoSVG} style={{ width: 120 }} alt="chodo logo" />
								</Link>
							</div>

							<div style={{}}>
								<Link to="/app">
									<VaporButton danger={true} size={'large'}>
										App
									</VaporButton>
								</Link>
							</div>
						</div>
					</Layout.Header>

					<Layout.Content
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
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'flex-start',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<div style={{ maxWidth: 720 }}>
									<Typography.Title level={isSmallScreenOrMobile ? 2 : 1}>
										Plan your next dream project
									</Typography.Title>
								</div>

								<div style={{ maxWidth: 720 }}>
									<Typography.Title level={isSmallScreenOrMobile ? 5 : 4} style={{ fontWeight: 'normal' }}>
										Create to-do lists to organize your work efficiently and boost your productivity by completing
										tasks.
									</Typography.Title>
								</div>

								<div style={{ marginTop: 32 }}>
									<Link to="/app">
										<VaporButton size={'large'} enlarge={true}>
											Create now
										</VaporButton>
									</Link>
								</div>
							</div>
						</div>
					</Layout.Content>

					<Layout.Footer
						style={{
							background: '#00000000',
							paddingLeft: isSmallScreenOrMobile ? 24 : 50,
							paddingRight: isSmallScreenOrMobile ? 24 : 50,
						}}
					>
						<div
							style={{
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}
						>
							<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
								<div style={{}}>
									<Typography.Text>Powered by</Typography.Text>
								</div>

								<div style={{ marginLeft: 4 }}>
									<a href="https://solana.com/">
										<img src={SolanaLogoImage} style={{ width: 120 }} alt="solana logo" />
									</a>
								</div>
							</div>
						</div>
					</Layout.Footer>
				</Layout>
			</div>
		</div>
	);
});
