import React from 'react'
import { Paths } from './paths'
import AuthPage from '../pages/auth/AuthPage'
import LoginPage from '../pages/auth/LoginPage'
import { Route, Switch } from 'react-router'
import { RouteType } from '../types/appTypes'

export const Router = () => {
  return (
    <Switch>
      {publicRoutes.map(({ path, component }) =>
        <Route
          key={path}
          path={path}
          component={component}
          exact
        />,
      )}
    </Switch>
  )
}

const publicRoutes: Array<RouteType> = [
  {
    path: Paths.AuthPage,
    component: AuthPage,
  },
  {
    path: Paths.LoginPage,
    component: LoginPage,
  },
]