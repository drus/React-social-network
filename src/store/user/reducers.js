import {LOGIN, SET_USERID, SET_USERDATA, SET_WALL} from './actions'

const initialState={uid:''};

export default (state=initialState, action)=>{

    switch(action.type){
        case SET_USERID:
        return {
            ...state,
            uid:action.payload
        };

        case SET_USERDATA:
        return {
            ...state,
            userdata:action.payload
        };

        case SET_WALL:
        return {
            ...state,
            datalist:action.payload
        };

        case LOGIN:
        return {
            ...state,
            userData:action.payload
        }

        default:
        return state;

    }

}

export const getUserId= state=> state.userReducer.uid;
export const getUserData= state=> state.userReducer.userdata;
export const getWall= state=> state.userReducer.datalist;