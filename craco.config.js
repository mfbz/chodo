const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@ant-prefix': 'chodo',

							'@primary-color': '#00FFB9',
							'@info-color': '#FF006C',
							'@normal-color': '#F2F2FA',
							'@white': '#FFFFFF',
							'@black': '#141033',

							'@body-background': '#FFFFFF',

							'@font-family': 'Helvetica, Arial, sans-serif',
							'@font-size-base': '16px',
							'@font-size-sm': '14px',

							'@border-radius-base': '16px',
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
