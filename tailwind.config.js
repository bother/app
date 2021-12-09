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
      'bother-bold': ['Satoshi-Bold'],
      'bother-medium': ['Satoshi-Medium'],
      'bother-regular': ['Satoshi-Regular']
    }
  }
}
