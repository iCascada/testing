import { AvailableModes, ModeActions } from '../actions/modeActions'

export const ModeActionCreators = {
  setMode:  (mode: AvailableModes): ModeActions => {
    localStorage.setItem('mode', mode)
    return { type: mode }
  }
}
