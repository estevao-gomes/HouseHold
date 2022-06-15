const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    colors: {
      primary: '#06ccb0',
      'primary-dark': '#009a81',
      'primary-light': '#62ffe2',
      secondary: '#cc0624',
      'secondary-light': '#ff514d',
      'secondary-dark': '#930000',
      onPrimary: '#000000',
      'onPrimary-dark': '#000000',
      'onPrimary-light': '#000000',
      onSecondary: '#ffffff',
      'onSecondary-light': '#000000',
      'onSecondary-dark': '#ffffff',
      onChecked: '#ffffff',
      checked: colors.green,
      notChecked: colors.gray,
      surface: '#ffffff',
      onSurface: "#000000"
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
