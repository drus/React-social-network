//import server from "../../scripts/server";

export const SET_USERID='SET_USERID';
export const SET_USERDATA='SET_USERDATA';
export const SET_WALL='SET_USERWALL';
export const LOGIN='LOGIN';

export const setUserId=(uid)=>{
    return {
        type: SET_USERID,
        payload:uid
    }
};

export const setUserData=(userdata)=>{
    return {
        type: SET_USERDATA,
        payload:userdata
    }
};

export const setWall=(datalist)=>{
    return {
        type: SET_WALL,
        payload:datalist
    }
};

export const incrementLikes=(topicId)=>{
    return {
        type:'INCREMENT_LIKES',
        payload:topicId
    }
};
/* 
export const setUserData=(uid)=>{
    server.database.getUser(uid)
    .then(userData=>{
        return {
            type: LOGIN,
            payload:userData
        }
        //store.dispatch(setUserId(uid));
    })
    //.then(userData=>{
    //    console.log("authorData", userData);
    //    store.dispatch(setUserData(userData));
    //})
    .catch(error=>{
        console.log("error", error);
    }
    );

} */


