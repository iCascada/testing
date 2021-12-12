import React from 'react'
import { Paper } from '@mui/material'
import { NavBar } from '../components/NavBar'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { useTSelector } from '../hooks/useTSelector'
import { getTheme } from '../themes/primary'
import { Router } from '../routes/Router'
import { BrowserRouter } from 'react-router-dom'

const LayoutTemplate = () => {
  const { mode } = useTSelector(state => state.mode)

  return (
      <ThemeProvider theme={getTheme(mode)}>
        <Paper sx={{ height: '100vh' }}>
          <NavBar mode={mode} />
          <Router />
        </Paper>
      </ThemeProvider>
  )
}

export default LayoutTemplate
