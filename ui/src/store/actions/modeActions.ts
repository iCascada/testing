import { Action } from 'redux'

export enum AvailableModes {
  MODE_LIGHT = 'MODE_LIGHT',
  MODE_DARK = 'MODE_DARK'
}

interface IModeDark extends Action {
  type: AvailableModes.MODE_DARK
}

interface IModeLight extends Action{
  type: AvailableModes.MODE_LIGHT
}

export type ModeActions = IModeDark | IModeLight