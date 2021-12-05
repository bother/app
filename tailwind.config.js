const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [],
  theme: {
    colors,
    extend: {
      colors: {
        accent: colors.sky,
        primary: colors.orange
      }
    },
    fontFamily: {
      'satoshi-bold': ['Satoshi-Bold'],
      'satoshi-medium': ['Satoshi-Medium'],
      'satoshi-regular': ['Satoshi-Regular']
    }
  }
}
