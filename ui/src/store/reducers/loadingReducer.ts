import {LoadingActions, LoadingTypes} from "../actions/loadingActions"

const initialState = {
  loading: true
}

export const loadingReducer = (state = initialState, action: LoadingActions) => {
  switch (action.type) {
    case LoadingTypes.LOAD:
      return {...state, loading: true}
    case LoadingTypes.LOADED:
      return {...state, loading: false}
    default:
      return state
  }
}