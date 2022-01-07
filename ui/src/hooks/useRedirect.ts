import React from "react"
import {useTSelector} from "./useTSelector"
import {rolesMapper} from "../lang/rus"
import {Paths} from "../routes/paths"
import {useHistory} from "react-router"

export const useRedirect = () => {
  const {user} = useTSelector(state => state.auth)
  const history = useHistory()

  if (user) {
    const role = user.role

    if (role === rolesMapper.user) {
      history.push(Paths.Panel)
      return
    }

    if (role === rolesMapper.admin || role === rolesMapper.moderator) {
      history.push(Paths.Dashboard)
      return
    }
  }
}