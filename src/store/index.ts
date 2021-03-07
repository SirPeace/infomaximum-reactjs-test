import { combineReducers } from "redux"
import AuthReducer from "./auth/reducer"
import ProcessesReducer from "./processes/reducer"

const rootReducer = combineReducers({
  auth: AuthReducer,
  processes: ProcessesReducer,
})

export default rootReducer
