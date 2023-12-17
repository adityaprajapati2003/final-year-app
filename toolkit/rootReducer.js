import { combineReducers } from "redux";
import UserAuthReducer from "./reducers/UserAuth";
import CartReducer from './reducers/CartReducer';

const rootReducer = combineReducers({
    user:UserAuthReducer,
    cart:CartReducer,
})

export default rootReducer;