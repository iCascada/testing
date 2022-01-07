import {request} from "../../axios/config"
import {availableRoutes} from "../../axios/serviceRoutes"
import {DispatchType} from "../index"
import {AuthAvailableActions, SetError, SetUser} from "../actions/authActions"
import {IUser} from "../../types/appTypes"
import axios from "axios"
import {messages} from "../../lang/rus"
import {serverResponseDelay} from "../../config/settings"

export const AuthActionCreators = {
  setUser: (payload: IUser): SetUser => ({type: AuthAvailableActions.SET_USER, payload}),
  setAuthError: (payload: string): SetError => ({type: AuthAvailableActions.SET_ERROR, payload}),

  authentication: (formData: FormData) => async (dispatch: DispatchType) => {
    try {
      const response = await request.post<IUser>(availableRoutes.authentication, formData)
      setTimeout(async () => {
        dispatch(AuthActionCreators.setUser(response.data))
        localStorage.setItem('token', response.headers['authorization'])
      }, serverResponseDelay)

    } catch (e) {
      if (axios.isAxiosError(e)) {
        dispatch(AuthActionCreators.setAuthError(messages.emailAlreadyExists))
      }else{
        dispatch(AuthActionCreators.setAuthError(messages.internalError))
      }
    }
  },

  login: (formData: FormData) => async (dispatch: DispatchType) => {
    try {
      const response = await request.post<IUser>(availableRoutes.login, formData)
      setTimeout(async () => {
        dispatch(AuthActionCreators.setUser(response.data))
        localStorage.setItem('token', response.headers['authorization'])
      }, serverResponseDelay)
    }catch (e){
      if (axios.isAxiosError(e)) {
        dispatch(AuthActionCreators.setAuthError(messages.credentialError))
      }else{
        dispatch(AuthActionCreators.setAuthError(messages.internalError))
      }
    }
  }
}