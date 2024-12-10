/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 4px 12px 0 rgba(0, 0, 0, 0.15)',
        myShadow:
          '0 1px 3px 0 var(--table-header), 0 1px 7px 0 rgba(0, 0, 0, 0.03), 0 3px 13px 0 rgba(0, 0, 0, 0.04), 0 5px 24px 0 rgba(0, 0, 0, 0.04), 0 9px 44px 0 rgba(0, 0, 0, 0.05), 0 22px 106px 0 rgba(0, 0, 0, 0.07)',
      },
      colors: {
        headingColor: 'var(--heading-color)',
        textColor: 'var(--text-color)',
        textColorSecondary: 'var(--text-color-secondary)',
        disabledColor: 'var(--disabled-color)',
        dividers: 'var(--dividers)',
        background: 'var(--background)',
        tableHeader: 'var(--table-header)',
        primaryColor: 'var(--primary-color)',
        infoColor: 'var(--info-color)',
        successColor: 'var(--success-color)',
        processingColor: 'var(--processing-color)',
        errorColor: 'var(--error-color)',
        highlightColor: 'var(--highlight-color)',
        warningColor: 'var(--warning-color)',
        normalColor: 'var(--normal-color)',
        disabledColorDark: 'var(--disabled-color-dark)',
        backgroundColorBase: 'var(--background-color-base)',
        borderColorBase: 'var(--border-color-base)',
        btnPrimaryColor: 'var(--btn-primary-color)',
      },
    },
  },
  plugins: [],
};
