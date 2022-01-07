import {AuthActions, AuthAvailableActions} from "../actions/authActions"
import {IAuthState, IUser} from "../../types/appTypes"

const initialState: IAuthState = {
  isAuth: false
}

export const authReducer = (state = initialState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case AuthAvailableActions.SET_USER:
      return {...state, isAuth: true, user: action.payload as IUser}
    case AuthAvailableActions.SET_ERROR:
      return {...state, isAuth: false, authError: action.payload as string}
    default:
      return state
  }
}