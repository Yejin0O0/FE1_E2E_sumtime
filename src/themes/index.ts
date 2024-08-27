const fontSize = Object.freeze({
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 64,
});

const fontWeight = Object.freeze({
  light: 400,
  regular: 500,
  medium: 600,
  bold: 700,
  extraBold: 800,
});

const color = Object.freeze({
  backgroundColor: '#FFFFFF',
  fontColor: '#000000',
  red: '#D32F2F',
});

const spacing = Object.freeze({
  xxxs: 4,
  xxs: 8,
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 44,
  xxl: 48,
  xxxl: 60,
  xxxxl: 64,
});

const theme = Object.freeze({
  fontSize,
  fontWeight,
  color,
  spacing,
});

export { theme, fontSize, fontWeight, color, spacing };
export { GlobalStyle } from './GlobalStyle';
export { MaterialThemeProvider } from './MaterialThemeProvider';
