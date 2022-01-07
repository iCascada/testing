import {ModeActionCreators} from "./mode"
import {AuthActionCreators} from "./auth"
import {LoadingActionCreators} from "./loading"

export const allActionCreators = {
  ...ModeActionCreators,
  ...AuthActionCreators,
  ...LoadingActionCreators
}