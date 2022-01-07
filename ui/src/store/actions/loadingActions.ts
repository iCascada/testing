import {Action} from "redux"

export enum LoadingTypes {
  LOAD = 'LOAD',
  LOADED = 'LOADED'
}

export interface Load extends Action {
  type: LoadingTypes.LOAD
}

export interface Loaded extends Action {
  type: LoadingTypes.LOADED
}

export type LoadingActions = Load | Loaded