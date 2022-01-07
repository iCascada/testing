import React from 'react'
import {AppBar, Box, Button, IconButton, Toolbar} from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import {AvailableModes} from '../store/actions/modeActions'
import {useActions} from '../hooks/useActions'
import {Paths} from '../routes/paths'
import {NavLink} from 'react-router-dom'
import {modeType} from "../types/appTypes"

export const GuestNavBar: React.FC<modeType> = ({ mode }) => {
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
          sx={{ justifyContent: 'end' }}
        >
          <div id="nav-bar-wrapper">
            <NavLink to={Paths.LoginPage}>
              <Button>
                Войти
              </Button>
            </NavLink>
            <NavLink to={Paths.AuthPage}>
              <Button>
                Регистрация
              </Button>
            </NavLink>
            {mode === AvailableModes.MODE_LIGHT &&
              <IconButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleModeHandler(
                  e, AvailableModes.MODE_DARK)}
                component="span"
              >
                  <LightModeIcon color="secondary" />
              </IconButton>
            }
            {mode === AvailableModes.MODE_DARK &&
              <IconButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => toggleModeHandler(
                  e, AvailableModes.MODE_LIGHT)}
                component="span"
              >
                  <DarkModeIcon color="secondary" />
              </IconButton>
            }
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}