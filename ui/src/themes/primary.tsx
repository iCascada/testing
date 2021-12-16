import {createTheme, Theme, ThemeOptions} from '@mui/material'
import {AvailableModes} from '../store/actions/modeActions'

const themeOptionsLight: ThemeOptions = {
    palette: {
        primary: {
            main: '#0D47A1',
        },
        secondary: {
            main: '#D50000',
        },
        text: {
            secondary: 'rgba(113,113,113,0.7)',
        },
        background: {
            paper: '#E0E0E0',
        },
    },
}

export const themeOptionsDark: ThemeOptions = {
    palette: {
        primary: {
            main: '#303030',
        },
        secondary: {
            main: '#D50000',
        },
        text: {
            secondary: 'rgba(113,113,113,0.7)',
        },
        background: {
            paper: '#212121',
        },
    },
};

export const getCardBg = (mode: AvailableModes): string => {
    return mode === AvailableModes.MODE_LIGHT ? '#FAFAFA' : '#aaaaaa'
}

export const getTheme = (mode: AvailableModes): Theme => {
    const isDark = mode === AvailableModes.MODE_DARK

    const componentOptions: ThemeOptions = {
        components: {
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        color: isDark ? '#FFFFFF' : '#0000000',
                        '&:hover': {
                            backgroundColor: '#D50000',
                            color: '#FFFFFF',
                        }
                    }
                }
            },
        }
    }

    if (!isDark) {
        return createTheme(themeOptionsLight, componentOptions)
    }

    return createTheme(themeOptionsDark, componentOptions)
}
