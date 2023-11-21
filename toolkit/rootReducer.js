import { combineReducers } from "redux";
import UserAuthReducer from "./reducers/UserAuth";

const rootReducer = combineReducers({
    user:UserAuthReducer,
})

export default rootReducer;