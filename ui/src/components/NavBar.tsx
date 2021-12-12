import React from 'react'
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { amber, blue } from '@mui/material/colors'
import { AvailableModes } from '../store/actions/modeActions'
import { useActions } from '../hooks/useActions'
import { modeType } from '../store/types/storeTypes'
import { Paths } from '../routes/paths'
import { NavLink } from 'react-router-dom'

export const NavBar: React.FC<modeType> = ({ mode }) => {
  const { setMode } = useActions()

  const toggleModeHandler = (
    e: React.MouseEvent<HTMLButtonElement>, toggleMode: AvailableModes) => {
    setMode(toggleMode)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{ justifyContent: 'space-between' }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <div>
            <NavLink to={Paths.LoginPage}>
              <Button
                sx={{
                  color: mode === AvailableModes.MODE_LIGHT
                    ? 'black'
                    : 'white',
                }}
              >
                Войти
              </Button>
            </NavLink>
            <NavLink to={Paths.AuthPage}>
              <Button
                sx={{
                  color: mode === AvailableModes.MODE_LIGHT
                    ? 'black'
                    : 'white',
                }}
              >
                Регистрация
              </Button>
            </NavLink>
            {mode === AvailableModes.MODE_LIGHT &&
            <IconButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleModeHandler(
                e, AvailableModes.MODE_DARK)}
              color="secondary"
              component="span"
            >
                <LightModeIcon
                  sx={{ color: amber[500] }}
                />
            </IconButton>
            }
            {mode === AvailableModes.MODE_DARK &&
            <IconButton
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleModeHandler(
                e, AvailableModes.MODE_LIGHT)}
              color="secondary"
              component="span"
            >
                <DarkModeIcon
                  sx={{ color: blue[700] }}
                />
            </IconButton>
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}