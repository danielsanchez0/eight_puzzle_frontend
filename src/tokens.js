export const FONT_FAMILY = {
  primary: '\'Viga\', sans-serif',
  secondary: '\'Pattaya\', sans-serif'
}

const lightColorFromHue = (hue: number) => `hsl(${hue}, 74%, 39%)`
const colorFromHue = (hue: number) => `hsl(${hue}, 79%, 28%)`

const colorTokens = (hue: number) =>
  ({
    primary: colorFromHue(hue),
    primaryLight: lightColorFromHue(hue)
  })

export const THEME = {
  green: colorTokens(164),
  blue: colorTokens(194),
  purple: colorTokens(278),
  pink: colorTokens(308),
  red: colorTokens(338)
}

const isThemeColor = colorTokens(194)

export const THEME_COLORS = Object.keys(THEME).filter(isThemeColor)

export type ThemeColor = THEME
