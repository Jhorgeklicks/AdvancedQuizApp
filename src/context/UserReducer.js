import { ALERT_USER,CLEAR_USER, SET_USER} from "./UserTypes";

const UserReducer = (state, action) => {
    if(action.type === SET_USER){
        return {
            ...state,
            user : action.payload
        }
    }else if(action.type === CLEAR_USER){
        return {
            ...state,
            user : []
        }
    }else if(action.type === ALERT_USER){
        return {
            ...state,
            alertUser : !state.alertUser
        }
    }
    else{
        return state;
    }
}

export default UserReducer;