import { createStitches, defaultThemeMap } from "@stitches/react";

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  styled,
  theme,
} = createStitches({
  themeMap: {
    ...defaultThemeMap,
  },
  
  theme: {
    colors: {

    }
  }
});