import React from 'react'
import { Paths } from './paths'
import AuthPage from '../pages/auth/AuthPage'
import LoginPage from '../pages/auth/LoginPage'
import {Redirect, Route, Switch} from 'react-router'
import { RouteType } from '../types/appTypes'
import {useTSelector} from "../hooks/useTSelector"
import Dashboard from "../pages/admin/Dashboard"
import Panel from "../pages/public/Panel"
import {rolesMapper} from "../lang/rus"

export const Router = () => {
  const {isAuth, user} = useTSelector(state => state.auth)

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

      {isAuth && userRoutes.map(({ path, component }) =>
        <Route
          key={path}
          path={path}
          component={component}
          exact
        />,
      )}

      {isAdmin() &&
        adminRoutes.map(({ path, component }) =>
          <Route
            key={path}
            path={path}
            component={component}
            exact
          />,
      )}

      {!isAuth && <Redirect to={Paths.LoginPage} />}
    </Switch>
  )

  function isAdmin(): boolean | undefined {
    return isAuth && user &&
      (user.role === rolesMapper.admin || user.role === rolesMapper.moderator)
  }
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

const userRoutes: Array<RouteType> = [
  {
    path: Paths.Panel,
    component: Panel,
  },
]

const adminRoutes: Array<RouteType> = [
  {
    path: Paths.Dashboard,
    component: Dashboard,
  },
]