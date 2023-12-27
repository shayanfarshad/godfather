// TODO: write documentation for colors and palette in own markdown file and add links from here

// really usefull website to get color tints and shades
// https://www.color-hex.com/color/1d6f2f

const palette = {
  neutral100: '#FFFFFF',
  neutral200: '#F4F2F1',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',

  primary100: '#000617',
  primary200: '#010b2b',
  primary300: '#0f1f4f',
  primary400: '#505e6f',
  primary500: '#1d3046',
  primary600: '#051a32',

  secondary100: '#add1f3',
  secondary200: '#bcdaf5',
  secondary300: '#7fa4c7',
  secondary400: '#485e73',
  secondary500: '#41476E',

  accent100: '#FFEED4',
  accent200: '#FFE1B2',
  accent300: '#FDD495',
  accent400: '#FBC878',
  accent500: '#FFBB50',

  angry100: '#F2D6CD',
  angry500: '#C03403',
  angry900: '#6f2f1d',

  happy100: '#fb9833',
  happy500: '#03c034',
  happy900: '#1D6F2F',

  nuetral100: '#d6cdf2',
  nuetral500: '#3403c0',
  nuetral900: '#2f1d6f',

  overlay40: 'rgba(173, 209, 243,0.4)',
  overlay20: 'rgba(1, 11, 43,0.6)',
} as const;

const lightColors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: palette.primary100,

  bottomActiveTint: palette.primary100,
  bottomInactiveTint: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.secondary100,
  cardBackground: palette.secondary200,
  overlayBackground: palette.overlay40,

  modalBackground: palette.happy100,
  special: palette.happy100,

  /**
   * The default border color.
   */
  border: palette.primary200,
  /**
   * The main tinting color.
   */
  // tint: palette.primary500,
  tint: palette.primary100,

  bottomCenterColor: palette.secondary400,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  /**
   * Bottom tab bar Background.
   */
  bottomTabBarBackground: palette.secondary300,
  /**
   * Button tab Background.
   */
  buttonBackground: palette.neutral200,
  buttonText: palette.neutral200,
  inputBackground: palette.neutral200,
};
const darkColors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The default text color in many components.
   */
  text: palette.neutral200,
  bottomActiveTint: '#0D98BA',
  bottomInactiveTint: palette.neutral200,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.primary200, // palette.neutral800,

  cardBackground: palette.primary300,
  modalBackground: palette.primary300,
  overlayBackground: palette.overlay20,
  special: palette.happy100,
  /**
   * The default border color.
   */
  border: palette.neutral200,
  /**
   * The main tinting color.
   */
  // tint: palette.primary500,
  tint: '#0D98BA',

  bottomCenterColor: '#485e73',

  /**
   * A subtle color used for lines.
   */
  separator: '#0D98BA', // palette.neutral700,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  /**
   * Bottom tab bar Background.
   */
  bottomTabBarBackground: palette.primary100,
  /**
   * Button tab Background.
   */
  buttonBackground: palette.neutral200,
  buttonText: palette.neutral800,
  inputBackground: palette.neutral200,
};

let colors: typeof lightColors | typeof darkColors = lightColors;

const setColorMode = (mode: boolean) => {
  colors = mode === true ? darkColors : lightColors;
};

export {colors, setColorMode};
