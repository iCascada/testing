import React, {useEffect} from 'react'
import {GuestNavBar} from '../components/GuestNavBar'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import {useTSelector} from '../hooks/useTSelector'
import {getTheme} from '../themes/primary'
import {Router} from '../routes/Router'
import {LinearProgress, Paper} from "@mui/material";
import {IUser} from "../types/appTypes"
import {checkUserAuth} from "../axios/UserRepository"
import {useActions} from "../hooks/useActions"
import {serverResponseDelay} from "../config/settings"

const LayoutTemplate = () => {
  const {mode} = useTSelector(state => state.mode)
  const {isAuth} = useTSelector(state => state.auth)
  const {loading} = useTSelector(state => state.loading)
  const {setUser, setLoaded} = useActions()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkUserAuth(token).then(
        (user: IUser | null) => {
          if (user) {
            setUser(user)
          } else {
            localStorage.removeItem('token')
          }
        },
        () => localStorage.removeItem('token')
      ).then(() => setTimeout(() => setLoaded(), serverResponseDelay))
    }else{
      setTimeout(() => setLoaded(), serverResponseDelay)
    }
  }, [])

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <Paper sx={{height: '100vh'}}>
        {!loading
          ?
            <>
              {!isAuth && <GuestNavBar mode={mode} />}
              <Router />
            </>
          :
          <LinearProgress color="secondary" />
        }
      </Paper>
    </ThemeProvider>
  )
}

export default LayoutTemplate
