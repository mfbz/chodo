const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#CBCBCC',
              '@body-background': '#3F3F3F',

              '@font-family': 'Arial, Helvetica, sans-serif',

              '@text-color': '#000000',
              '@text-color-secondary': '#000000',
              '@text-color-inverse': '#FFFFFF',

              '@disabled-color': 'fade(#000, 75%)',
              '@disabled-color-dark': 'fade(#000, 90%)',

              '@icon-color': '#000000',
              '@icon-color-hover': '#000000',

              '@heading-color': '#000000',
              '@text-color-dark': '#FFFFFF',
              '@text-color-secondary-dark': '#FFFFFF',
              '@text-selection-bg': '#292929',
              '@font-size-base': '20px',
              '@heading-color': '#000000',
              '@border-radius-base': '4px',

              '@height-base': '60px',
              '@height-lg': '72px',
              '@height-sm': '48px',

              '@item-active-bg': '#CBCBCC',
              '@item-hover-bg': '#f5f5f5',

              '@border-color-base': '#000000',
              '@border-color-split': '#000000',
              '@border-color-inverse': '#000000',
              '@border-width-base': '2px',

              '@btn-font-weight': '500',
              '@btn-border-radius-base': '2px',
              '@btn-border-width': '2px',
              '@btn-primary-color': '#000000',
              '@btn-text-hover-bg': '#CBCBCC',

              '@checkbox-size': '18px',
              '@checkbox-color': '#FFFFFF',
              '@checkbox-check-color': '#000000',
              '@checkbox-check-bg': '#FFFFFF',

              '@table-bg': '#FFFFFF',
              '@table-header-bg': '#3F3F3F',
              '@table-header-color': '#FFFFFF',
              '@table-selected-row-color': '#FFFFFF',

              '@input-placeholder-color': '#000000',
              '@input-bg': '#FFFFFF',
              '@input-number-hover-border-color': '#000000',
              '@input-number-handler-active-bg': '#FFFFFF',
              '@input-hover-border-color': '#000000',
              '@input-icon-hover-color': '#000000',

              '@progress-radius': '0px',

              '@animation-duration-base': '0s',

              '@select-dropdown-height': '48px',
              '@select-dropdown-line-height': '48px',

              '@switch-height': '48px',
              '@switch-color': '#3CC3FF',
              '@switch-bg': '#FFFFFF',

              '@radio-size': '24px',
              '@radio-dot-color': '#3CC3FF',
              '@radio-solid-checked-color': '#CBCBCC',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
