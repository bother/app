const colors = require('tailwindcss/colors')

module.exports = {
  plugins: [],
  theme: {
    colors,
    extend: {
      colors: {
        primary: colors.orange
      }
    },
    fontFamily: {
      'secret-bold': ['Satoshi-Bold'],
      'secret-medium': ['Satoshi-Medium'],
      'secret-regular': ['Satoshi-Regular']
    }
  }
}
