import {createStore, combineReducers} from 'redux';
import userReducer from './user/reducers';

const reducers=combineReducers({
    userReducer
});

const store=createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;