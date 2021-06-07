import { createStore, combineReducers, compose } from "redux";
import loginDetails from './reducers/loginDetailsReducer'

const appReducers = combineReducers(
{
    loginDetails
})

const rootReducer = (state, action) => {
    // if (action.type === RESET_APP){
    //     state = undefined;
    // }
    return appReducers(state, action);
}

const store = createStore(rootReducer);
export default store;