import { modeReducer } from './modeReducer'
import { combineReducers } from 'redux'
import {authReducer} from "./authReducer"
import {loadingReducer} from "./loadingReducer"

export const rootReducer = combineReducers({
  mode: modeReducer,
  auth: authReducer,
  loading: loadingReducer
})

export type reducersTypes = ReturnType<typeof rootReducer>