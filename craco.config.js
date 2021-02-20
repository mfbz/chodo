const CracoLessPlugin = require('craco-less');

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							'@primary-color': '#00FFB9',
							'@normal-color': '#F2F2FA',
							'@white': '#FFFFFF',
							'@black': '#141033',

							'@text-color': '#141033',
							'@text-color-secondary': 'fade(@black, 85%)',
							'@heading-color': '#141033',
							'@text-color-dark': '#FFFFFF',
							'@text-color-secondary-dark': 'fade(@white, 85%)',

							'@btn-primary-color': '#141033',
							'@btn-primary-bg': '#00FFB9',
							'@btn-danger-color': '#141033',
							'@btn-danger-bg': '#FF006C',
							'@btn-danger-border': '#FF006C',
							'@btn-font-weight': 'bold',

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
