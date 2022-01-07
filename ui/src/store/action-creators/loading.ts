import {LoadingTypes} from "../actions/loadingActions"

export const LoadingActionCreators = {
  setLoad: () => ({type: LoadingTypes.LOAD}),
  setLoaded: () => ({type: LoadingTypes.LOADED})
}