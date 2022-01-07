import { Action } from 'redux'

export enum AvailableModes {
  MODE_LIGHT = 'MODE_LIGHT',
  MODE_DARK = 'MODE_DARK'
}

interface SetModeDark extends Action {
  type: AvailableModes.MODE_DARK
}

interface SetModeLight extends Action{
  type: AvailableModes.MODE_LIGHT
}

export type ModeActions = SetModeDark | SetModeLight