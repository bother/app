const colors = require('tailwindcss/colors')
const pick = require('lodash/pick')

const allowedColors =
  'amber,black,blue,current,cyan,emerald,fuchsia,gray,green,indigo,inherit,lime,neutral,orange,pink,purple,red,rose,sky,slate,stone,teal,transparent,violet,white,yellow,zinc'.split(
    ','
  )

module.exports = {
  plugins: [],
  theme: {
    colors: pick(colors, allowedColors),
    extend: {
      colors: {
        primary: colors.orange
      }
    },
    fontFamily: {
      'bother-bold': ['Satoshi-Bold'],
      'bother-medium': ['Satoshi-Medium'],
      'bother-mono': ['RobotoMono-Regular'],
      'bother-regular': ['Satoshi-Regular']
    }
  }
}
