import { modeReducer } from './modeReducer'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  mode: modeReducer,
})

export type reducersTypes = ReturnType<typeof rootReducer>