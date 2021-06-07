import { STORE_LOGIN_DETAILS } from '../action';

const initialState = { 
   
        user_id:'test value',
        access_details: null
        
   
}

const loginDetails = (state = initialState, action) => {
    switch (action.type) {
        case STORE_LOGIN_DETAILS:
            return Object.assign({}, state, { access_details: action.payload })
        default:
            return state;
    }
};

export default loginDetails;