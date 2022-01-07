import {AvailableModes, ModeActions} from '../actions/modeActions'
import {modeType} from "../../types/appTypes"

const mode = localStorage.getItem('mode') as AvailableModes

const initialState: modeType = {
  mode: mode ?? AvailableModes.MODE_LIGHT,
}

export const modeReducer = (state = initialState, action: ModeActions): modeType => {
  switch (action.type) {
    case AvailableModes.MODE_DARK:
      return { mode: AvailableModes.MODE_DARK }
    case AvailableModes.MODE_LIGHT:
      return { mode: AvailableModes.MODE_LIGHT }
    default:
      return state
  }
}