import { createTheme, ThemeOptions, Theme } from '@mui/material'
import { AvailableModes } from '../store/actions/modeActions'

const themeOptionsLight: ThemeOptions = {
  palette: {
    primary: {
      main: '#f5f5f5',
    },
    secondary: {
      main: '#f4511e',
    },
    text: {
      secondary: 'rgba(113,113,113,0.7)',
    },
    background: {
      default: '#d5d5d5',
      paper: '#fafafa',
    },
  },
}

export const themeOptionsDark: ThemeOptions = {
  palette: {
    primary: {
      main: '#303030',
    },
    secondary: {
      main: '#f4511e',
    },
    text: {
      secondary: 'rgba(113,113,113,0.7)',
    },
    background: {
      default: '#212121',
      paper: '#424242',
    },
  },
};

export const getTheme = (mode: AvailableModes): Theme => {
  if (mode === AvailableModes.MODE_LIGHT){
    return createTheme(themeOptionsLight)
  }

  return createTheme(themeOptionsDark)
}
