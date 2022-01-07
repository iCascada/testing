import {request} from "./config"
import {availableRoutes} from "./serviceRoutes"
import {AuthResponse, IError, IUser} from "../types/appTypes"
import {isEmpty} from "../common/utils"

export const checkUserAuth = async (token: string): Promise<IUser|null> => {
  const {data} = await request.post<AuthResponse|IError>(availableRoutes.checkUser, {'token' : token})
  if ("user" in data && !isEmpty(data.user)) {
    return data.user
  }

  return null
}