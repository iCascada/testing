import {Action} from "redux"
import {IUser} from "../../types/appTypes"

export enum AuthAvailableActions {
  SET_ERROR = 'SET_ERROR',
  SET_USER = 'SET_USER',
}

export interface SetError extends Action {
  type: AuthAvailableActions.SET_ERROR
  payload: string
}

export interface SetUser extends Action {
  type: AuthAvailableActions.SET_USER
  payload: IUser
}

export type AuthActions = SetError | SetUser